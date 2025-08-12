from datetime import datetime
from pydantic import BaseModel
from typing import Optional

# Shared properties
class DocumentBase(BaseModel):
    name: str
    file_type: str
    size: str

# Properties to receive via API on creation
class DocumentCreate(DocumentBase):
    content: Optional[str] = None
    file_path: Optional[str] = None
    space_id: int

# Properties to receive via API on update
class DocumentUpdate(DocumentBase):
    content: Optional[str] = None
    file_path: Optional[str] = None

# Properties to return via API
class Document(DocumentBase):
    id: int
    space_id: int
    created_at: datetime
    modified_at: datetime

    class Config:
        orm_mode = True