from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from crud import document as crud_document
from schemas import document as schemas_document
from database import get_db

router = APIRouter()

@router.post("/", response_model=schemas_document.Document)
def create_document(document: schemas_document.DocumentCreate, db: Session = Depends(get_db)):
    return crud_document.create_document(db=db, document=document)

@router.get("/{document_id}", response_model=schemas_document.Document)
def read_document(document_id: int, db: Session = Depends(get_db)):
    db_document = crud_document.get_document(db, document_id=document_id)
    if db_document is None:
        raise HTTPException(status_code=404, detail="Document not found")
    return db_document

@router.get("/", response_model=List[schemas_document.Document])
def read_documents(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    documents = crud_document.get_documents(db, skip=skip, limit=limit)
    return documents

@router.put("/{document_id}", response_model=schemas_document.Document)
def update_document(document_id: int, document: schemas_document.DocumentUpdate, db: Session = Depends(get_db)):
    db_document = crud_document.update_document(db, document_id=document_id, document=document)
    if db_document is None:
        raise HTTPException(status_code=404, detail="Document not found")
    return db_document

@router.delete("/{document_id}", response_model=schemas_document.Document)
def delete_document(document_id: int, db: Session = Depends(get_db)):
    db_document = crud_document.delete_document(db, document_id=document_id)
    if db_document is None:
        raise HTTPException(status_code=404, detail="Document not found")
    return db_document