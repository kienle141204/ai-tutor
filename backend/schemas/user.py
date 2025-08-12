from datetime import datetime
from pydantic import BaseModel, EmailStr
from typing import Optional

# Shared properties
class UserBase(BaseModel):
    name: str
    email: EmailStr
    phone: str
    job_title: Optional[str] = None
    company: Optional[str] = None
    location: Optional[str] = None

# Properties to receive via API on creation
class UserCreate(UserBase):
    password: str

# Properties to receive via API on update
class UserUpdate(UserBase):
    password: Optional[str] = None

# Properties to return via API
class User(UserBase):
    id: int
    is_verified: bool
    created_at: datetime

    class Config:
        orm_mode = True

# Properties stored in DB
class UserInDB(User):
    password_hash: str