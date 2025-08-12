from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from crud import user as crud_user
from schemas import user as schemas_user
from database import get_db

router = APIRouter()

@router.get("/{user_id}", response_model=schemas_user.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud_user.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@router.get("/", response_model=List[schemas_user.User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud_user.get_users(db, skip=skip, limit=limit)
    return users

@router.put("/{user_id}", response_model=schemas_user.User)
def update_user(user_id: int, user: schemas_user.UserUpdate, db: Session = Depends(get_db)):
    db_user = crud_user.update_user(db, user_id=user_id, user=user)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@router.delete("/{user_id}", response_model=schemas_user.User)
def delete_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud_user.delete_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user