from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from crud import conversation as crud_conversation
from schemas import conversation as schemas_conversation
from database import get_db

router = APIRouter()

@router.post("/", response_model=schemas_conversation.Conversation)
def create_conversation(conversation: schemas_conversation.ConversationCreate, db: Session = Depends(get_db)):
    return crud_conversation.create_conversation(db=db, conversation=conversation)

@router.get("/{conversation_id}", response_model=schemas_conversation.Conversation)
def read_conversation(conversation_id: int, db: Session = Depends(get_db)):
    db_conversation = crud_conversation.get_conversation(db, conversation_id=conversation_id)
    if db_conversation is None:
        raise HTTPException(status_code=404, detail="Conversation not found")
    return db_conversation

@router.get("/", response_model=List[schemas_conversation.Conversation])
def read_conversations(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    conversations = crud_conversation.get_conversations(db, skip=skip, limit=limit)
    return conversations

@router.put("/{conversation_id}", response_model=schemas_conversation.Conversation)
def update_conversation(conversation_id: int, conversation: schemas_conversation.ConversationUpdate, db: Session = Depends(get_db)):
    db_conversation = crud_conversation.update_conversation(db, conversation_id=conversation_id, conversation=conversation)
    if db_conversation is None:
        raise HTTPException(status_code=404, detail="Conversation not found")
    return db_conversation

@router.delete("/{conversation_id}", response_model=schemas_conversation.Conversation)
def delete_conversation(conversation_id: int, db: Session = Depends(get_db)):
    db_conversation = crud_conversation.delete_conversation(db, conversation_id=conversation_id)
    if db_conversation is None:
        raise HTTPException(status_code=404, detail="Conversation not found")
    return db_conversation