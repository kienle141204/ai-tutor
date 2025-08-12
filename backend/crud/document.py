from sqlalchemy.orm import Session
from models import document as models_document
from schemas import document as schemas_document

def get_document(db: Session, document_id: int):
    return db.query(models_document.Document).filter(models_document.Document.id == document_id).first()

def get_documents(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models_document.Document).offset(skip).limit(limit).all()

def create_document(db: Session, document: schemas_document.DocumentCreate):
    db_document = models_document.Document(
        name=document.name,
        file_type=document.file_type,
        size=document.size,
        content=document.content,
        file_path=document.file_path,
        space_id=document.space_id
    )
    db.add(db_document)
    db.commit()
    db.refresh(db_document)
    return db_document

def update_document(db: Session, document_id: int, document: schemas_document.DocumentUpdate):
    db_document = db.query(models_document.Document).filter(models_document.Document.id == document_id).first()
    if db_document:
        update_data = document.dict(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_document, key, value)
        db.commit()
        db.refresh(db_document)
    return db_document

def delete_document(db: Session, document_id: int):
    db_document = db.query(models_document.Document).filter(models_document.Document.id == document_id).first()
    if db_document:
        db.delete(db_document)
        db.commit()
    return db_document