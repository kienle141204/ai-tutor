from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.sql import func
from database import Base

class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True)
    content = Column(Text)
    sender = Column(String(10))  # 'user' or 'ai'
    conversation_id = Column(Integer, ForeignKey("conversations.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())