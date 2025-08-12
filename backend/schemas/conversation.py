from datetime import datetime
from pydantic import BaseModel
from typing import Optional, List

# Shared properties
class ConversationBase(BaseModel):
    title: str
    model: Optional[str] = "Flash"
    space_id: int

# Properties to receive via API on creation
class ConversationCreate(ConversationBase):
    pass

# Properties to receive via API on update
class ConversationUpdate(ConversationBase):
    pass

# Properties to return via API
class Conversation(ConversationBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True