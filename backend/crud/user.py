from sqlalchemy.orm import Session
from models import user as models_user
from schemas import user as schemas_user
from core import security

def get_user(db: Session, user_id: int):
    return db.query(models_user.User).filter(models_user.User.id == user_id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models_user.User).filter(models_user.User.email == email).first()

def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models_user.User).offset(skip).limit(limit).all()

def create_user(db: Session, user: schemas_user.UserCreate):
    db_user = models_user.User(
        name=user.name,
        email=user.email,
        job_title=user.job_title,
        phone="",  # Default empty string for optional fields
        company=None,
        location=None,
        password_hash=security.get_password_hash(user.password)
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def update_user(db: Session, user_id: int, user: schemas_user.UserUpdate):
    db_user = db.query(models_user.User).filter(models_user.User.id == user_id).first()
    if db_user:
        update_data = user.dict(exclude_unset=True)
        if "password" in update_data and update_data["password"]:
            update_data["password_hash"] = security.get_password_hash(update_data.pop("password"))
        for key, value in update_data.items():
            setattr(db_user, key, value)
        db.commit()
        db.refresh(db_user)
    return db_user

def delete_user(db: Session, user_id: int):
    db_user = db.query(models_user.User).filter(models_user.User.id == user_id).first()
    if db_user:
        db.delete(db_user)
        db.commit()
    return db_user