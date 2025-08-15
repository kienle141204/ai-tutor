from sqlalchemy.orm import Session
from models import conversation as models_conversation
from models import message as models_message
from schemas import conversation as schemas_conversation

def get_conversation(db: Session, conversation_id: int):
    return db.query(models_conversation.Conversation).filter(models_conversation.Conversation.id == conversation_id).first()

def get_conversations(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models_conversation.Conversation).offset(skip).limit(limit).all()

def get_conversations_by_space(db: Session, space_id: int, skip: int = 0, limit: int = 100):
    return db.query(models_conversation.Conversation).filter(models_conversation.Conversation.space_id == space_id).offset(skip).limit(limit).all()

def create_conversation(db: Session, conversation: schemas_conversation.ConversationCreate):
    db_conversation = models_conversation.Conversation(
        title=conversation.title,
        model=conversation.model,
        space_id=conversation.space_id
    )
    db.add(db_conversation)
    db.commit()
    db.refresh(db_conversation)
    return db_conversation

def update_conversation(db: Session, conversation_id: int, conversation: schemas_conversation.ConversationUpdate):
    db_conversation = db.query(models_conversation.Conversation).filter(models_conversation.Conversation.id == conversation_id).first()
    if db_conversation:
        update_data = conversation.dict(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_conversation, key, value)
        db.commit()
        db.refresh(db_conversation)
    return db_conversation

def delete_conversation(db: Session, conversation_id: int):
    # Xóa tất cả messages liên quan đến conversation
    db.query(models_message.Message).filter(models_message.Message.conversation_id == conversation_id).delete()
    
    # Xóa conversation
    db_conversation = db.query(models_conversation.Conversation).filter(models_conversation.Conversation.id == conversation_id).first()
    if db_conversation:
        db.delete(db_conversation)
        db.commit()
    return db_conversation