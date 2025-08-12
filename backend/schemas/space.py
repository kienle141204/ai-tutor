from datetime import datetime
from pydantic import BaseModel
from typing import Optional, List

# Shared properties
class SpaceBase(BaseModel):
    name: str
    description: Optional[str] = None
    icon: Optional[str] = "folder"

# Properties to receive via API on creation
class SpaceCreate(SpaceBase):
    pass

# Properties to receive via API on update
class SpaceUpdate(SpaceBase):
    pass

# Properties to return via API
class Space(SpaceBase):
    id: int
    owner_id: int
    created_at: datetime

    class Config:
        orm_mode = True