from sqlalchemy.orm import Session
from models import space as models_space
from schemas import space as schemas_space

def get_space(db: Session, space_id: int):
    return db.query(models_space.Space).filter(models_space.Space.id == space_id).first()

def get_spaces(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models_space.Space).offset(skip).limit(limit).all()

def create_space(db: Session, space: schemas_space.SpaceCreate, owner_id: int):
    db_space = models_space.Space(
        name=space.name,
        description=space.description,
        icon=space.icon,
        owner_id=owner_id
    )
    db.add(db_space)
    db.commit()
    db.refresh(db_space)
    return db_space

def update_space(db: Session, space_id: int, space: schemas_space.SpaceUpdate):
    db_space = db.query(models_space.Space).filter(models_space.Space.id == space_id).first()
    if db_space:
        update_data = space.dict(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_space, key, value)
        db.commit()
        db.refresh(db_space)
    return db_space

def delete_space(db: Session, space_id: int):
    db_space = db.query(models_space.Space).filter(models_space.Space.id == space_id).first()
    if db_space:
        db.delete(db_space)
        db.commit()
    return db_space