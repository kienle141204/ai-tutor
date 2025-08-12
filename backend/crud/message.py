from sqlalchemy.orm import Session
from models import message as models_message
from schemas import message as schemas_message

def get_message(db: Session, message_id: int):
    return db.query(models_message.Message).filter(models_message.Message.id == message_id).first()

def get_messages(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models_message.Message).offset(skip).limit(limit).all()

def create_message(db: Session, message: schemas_message.MessageCreate):
    db_message = models_message.Message(
        content=message.content,
        sender=message.sender,
        conversation_id=message.conversation_id
    )
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message

def update_message(db: Session, message_id: int, message: schemas_message.MessageUpdate):
    db_message = db.query(models_message.Message).filter(models_message.Message.id == message_id).first()
    if db_message:
        update_data = message.dict(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_message, key, value)
        db.commit()
        db.refresh(db_message)
    return db_message

def delete_message(db: Session, message_id: int):
    db_message = db.query(models_message.Message).filter(models_message.Message.id == message_id).first()
    if db_message:
        db.delete(db_message)
        db.commit()
    return db_message