from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.sql import func
from database import Base

class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    file_type = Column(String)
    size = Column(String)
    content = Column(Text, nullable=True)  # For text documents
    file_path = Column(String, nullable=True)  # For file storage path
    space_id = Column(Integer, ForeignKey("spaces.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    modified_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())