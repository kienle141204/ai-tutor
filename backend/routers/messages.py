from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from crud import message as crud_message
from schemas import message as schemas_message
from database import get_db

router = APIRouter()

@router.post("/", response_model=schemas_message.Message)
def create_message(message: schemas_message.MessageCreate, db: Session = Depends(get_db)):
    return crud_message.create_message(db=db, message=message)

@router.get("/{message_id}", response_model=schemas_message.Message)
def read_message(message_id: int, db: Session = Depends(get_db)):
    db_message = crud_message.get_message(db, message_id=message_id)
    if db_message is None:
        raise HTTPException(status_code=404, detail="Message not found")
    return db_message

@router.get("/", response_model=List[schemas_message.Message])
def read_messages(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    messages = crud_message.get_messages(db, skip=skip, limit=limit)
    return messages

@router.put("/{message_id}", response_model=schemas_message.Message)
def update_message(message_id: int, message: schemas_message.MessageUpdate, db: Session = Depends(get_db)):
    db_message = crud_message.update_message(db, message_id=message_id, message=message)
    if db_message is None:
        raise HTTPException(status_code=404, detail="Message not found")
    return db_message

@router.delete("/{message_id}", response_model=schemas_message.Message)
def delete_message(message_id: int, db: Session = Depends(get_db)):
    db_message = crud_message.delete_message(db, message_id=message_id)
    if db_message is None:
        raise HTTPException(status_code=404, detail="Message not found")
    return db_message