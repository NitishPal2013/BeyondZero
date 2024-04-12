from pydantic import BaseModel
from typing import List
from datetime import datetime

class AddNote(BaseModel):
    username : str
    title : str | None
    note : str | None
    resources : List[str]
    created_at : str | datetime

class QueryModel(BaseModel):
    query: str