from datetime import datetime
from pydantic import BaseModel
from typing import Optional

# Shared properties
class MessageBase(BaseModel):
    content: str
    sender: str  # 'user' or 'ai'
    conversation_id: int

# Properties to receive via API on creation
class MessageCreate(MessageBase):
    pass

# Properties to receive via API on update
class MessageUpdate(MessageBase):
    pass

# Properties to return via API
class Message(MessageBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True