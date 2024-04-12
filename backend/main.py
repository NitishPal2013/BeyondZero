from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from model import AddNote, QueryModel
from datetime import datetime, timezone
from database import (all_notes, save_note)
from utils import query_search
from database import complete_notes_collection
import uvicorn
import os
from dotenv import load_dotenv
load_dotenv()

app = FastAPI()



app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return 'This is root!!'


@app.post('/addnote/')
async def addNote(note: AddNote):
    try:
        parsed_date = datetime.fromisoformat(note.created_at.rstrip("Z"))
        adjusted_date = parsed_date.astimezone(timezone.utc)
        note.created_at = adjusted_date

        result = await save_note(note)

        print(result)

        return f"Your Note has been successfully Saved!!"
    except Exception as e:
        print("exception is ", e)
        return "can't save the notes"


@app.get('/base')
async def sendnotes(username: str):
    notes = await all_notes(username)
    return notes

@app.post('/ask/')
async def AskQuery(query:QueryModel):
    res = await query_search(query.query, complete_notes_collection)
    return res

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=os.environ["PORT"], reload=True)