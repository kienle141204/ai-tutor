from sqlalchemy import Boolean, Column, Integer, String, DateTime
from sqlalchemy.sql import func
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), index=True)
    email = Column(String(255), unique=True, index=True)
    phone = Column(String(20))
    job_title = Column(String(255), nullable=True)
    company = Column(String(255), nullable=True)
    location = Column(String(255), nullable=True)
    password_hash = Column(String(255))
    is_verified = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())