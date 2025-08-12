from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from crud import space as crud_space
from schemas import space as schemas_space
from database import get_db
from core import security

router = APIRouter()

@router.post("/", response_model=schemas_space.Space)
def create_space(space: schemas_space.SpaceCreate, db: Session = Depends(get_db)):
    # In a real implementation, you would get the current user from the token
    # For now, we'll use a placeholder owner_id
    return crud_space.create_space(db=db, space=space, owner_id=1)

@router.get("/{space_id}", response_model=schemas_space.Space)
def read_space(space_id: int, db: Session = Depends(get_db)):
    db_space = crud_space.get_space(db, space_id=space_id)
    if db_space is None:
        raise HTTPException(status_code=404, detail="Space not found")
    return db_space

@router.get("/", response_model=List[schemas_space.Space])
def read_spaces(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    spaces = crud_space.get_spaces(db, skip=skip, limit=limit)
    return spaces

@router.put("/{space_id}", response_model=schemas_space.Space)
def update_space(space_id: int, space: schemas_space.SpaceUpdate, db: Session = Depends(get_db)):
    db_space = crud_space.update_space(db, space_id=space_id, space=space)
    if db_space is None:
        raise HTTPException(status_code=404, detail="Space not found")
    return db_space

@router.delete("/{space_id}", response_model=schemas_space.Space)
def delete_space(space_id: int, db: Session = Depends(get_db)):
    db_space = crud_space.delete_space(db, space_id=space_id)
    if db_space is None:
        raise HTTPException(status_code=404, detail="Space not found")
    return db_space