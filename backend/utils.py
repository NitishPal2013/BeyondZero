from bs4 import BeautifulSoup
import requests 
from youtube_transcript_api import YouTubeTranscriptApi
from urllib import parse
from langchain_google_genai import GoogleGenerativeAI
from langchain.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
import os
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.environ["GOOGLE_API_KEY"]

Gemini_model = GoogleGenerativeAI(model="gemini-pro", google_api_key=API_KEY)

prompt = PromptTemplate.from_template("You are a helpful assistant. From the given context Answer the question. \n context: {context} \n question: {query}")

rag_chain = (
    prompt
    | Gemini_model
    | StrOutputParser()
)

def extract_text_from_url(url: str):

    response = requests.get(url)

    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        text = ' '.join(t.strip() for t in soup.body.find_all(string=True)
                        if t.parent.name not in ['script', 'style', 'head', 'title', 'meta', 'link'])
        return text
    else:
        return "Failed to retrieve the webpage."


def extract_text_from_note(note: str):

    soup = BeautifulSoup(note, 'html.parser')
    text = soup.get_text()
    return text

# youtube transcript
 
def extract_text_from_youtube_url(url: str):
    parsed_url = parse.urlparse(url)

    video_id = parse.parse_qs(parsed_url.query).get('v')

    if video_id:
        try:
            transcript = YouTubeTranscriptApi.get_transcript(video_id[0])
            script = " ".join(t["text"] for t in transcript)
            return script or "No Scipt"
        except Exception as e:
            print(" Exception : ", e)
            return ""
    else:
        raise ValueError("This URL does not have a valid video ID")


async def save_complete_notes(note, resources, complete_notes_collection):
    complete_notes = ""
    complete_notes += extract_text_from_note(note)
    for res in resources:
        if "youtube" in res:
            complete_notes += extract_text_from_youtube_url(res)
        else:
            complete_notes += extract_text_from_url(res)
    
    await complete_notes_collection.insert_one({"text":complete_notes})


async def query_search(query: str, complete_notes_collection):    
    results = complete_notes_collection.aggregate(
        [
        {
            "$search": {
            "index": "complete_notes",
            "text": {
                "query": query,
                "path": {
                "wildcard": "*"
                }
            }
            }
        },
         {
    "$limit": 1
  }
        ]
    )

    context = ""

    async for res in results:
        context += res["text"] + "/n"
    
    answer = rag_chain.invoke({"context": context, "query": query})
    return answer


