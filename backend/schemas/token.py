from pydantic import BaseModel
from typing import Optional
from .user import User

class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str
    user: Optional[User] = None

class TokenData(BaseModel):
    email: Optional[str] = None