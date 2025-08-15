from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.sql import func
from database import Base

class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), index=True)
    file_type = Column(String(50))
    size = Column(String(50))
    content = Column(Text, nullable=True)  # For text documents
    file_path = Column(String(500), nullable=True)  # For file storage path
    space_id = Column(Integer, ForeignKey("spaces.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    modified_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())