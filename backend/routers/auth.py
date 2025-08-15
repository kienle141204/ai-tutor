from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status, Body
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from crud import user as crud_user
from schemas import user as schemas_user, token as schemas_token
from database import get_db
from core import security

router = APIRouter()

@router.post("/login", response_model=schemas_token.Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = crud_user.get_user_by_email(db, email=form_data.username)
    if not user or not security.verify_password(form_data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=security.ACCESS_TOKEN_EXPIRE_MINUTES)
    refresh_token_expires = timedelta(days=security.REFRESH_TOKEN_EXPIRE_DAYS)
    access_token = security.create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    refresh_token = security.create_refresh_token(
        data={"sub": user.email}, expires_delta=refresh_token_expires
    )
    # Trả về thông tin người dùng trong response
    return {
        "access_token": access_token, 
        "refresh_token": refresh_token, 
        "token_type": "bearer",
        "user": user
    }

@router.post("/refresh", response_model=schemas_token.Token)
def refresh_access_token(refresh_token: str = Body(...), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = security.jwt.decode(refresh_token, security.SECRET_KEY, algorithms=[security.ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = schemas_token.TokenData(email=email)
    except security.JWTError:
        raise credentials_exception
    user = crud_user.get_user_by_email(db, email=token_data.email)
    if user is None:
        raise credentials_exception
    access_token_expires = timedelta(minutes=security.ACCESS_TOKEN_EXPIRE_MINUTES)
    refresh_token_expires = timedelta(days=security.REFRESH_TOKEN_EXPIRE_DAYS)
    access_token = security.create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    new_refresh_token = security.create_refresh_token(
        data={"sub": user.email}, expires_delta=refresh_token_expires
    )
    return {
        "access_token": access_token, 
        "refresh_token": new_refresh_token, 
        "token_type": "bearer",
        "user": user
    }

@router.post("/register", response_model=schemas_user.User)
def register_user(user: schemas_user.UserCreate, db: Session = Depends(get_db)):
    db_user = crud_user.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud_user.create_user(db=db, user=user)