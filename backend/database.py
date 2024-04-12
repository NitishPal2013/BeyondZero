import motor.motor_asyncio as mt_async
from model import AddNote
from dotenv import load_dotenv
from utils import save_complete_notes
import os
load_dotenv()

client =  mt_async.AsyncIOMotorClient(os.environ["MONGODB_URI"])

database = client.BeyondZero

collection = database.notes

complete_notes_collection = collection.complete_notes_collection

async def all_notes(user: str):
    notes = []
    docs = collection.find({"username": user}).sort("created_at", -1)
    async for doc in docs:
        notes.append(AddNote(**doc))
    return notes


async def save_note(note):
    try:
        doc = dict(note)
        await collection.insert_one(doc)
        await save_complete_notes(doc["note"], doc["resources"], complete_notes_collection)
        return doc
    except Exception as e:
        print("Exception Occur in saving note as : ", e)
        return e




