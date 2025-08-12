from fastapi import FastAPI
from routers import auth_router, users_router, spaces_router, documents_router, conversations_router, messages_router
from database import Base, engine

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI Tutor API", description="Backend API for AI Tutor application")

# Include routers
app.include_router(auth_router, prefix="/api/auth", tags=["authentication"])
app.include_router(users_router, prefix="/api/users", tags=["users"])
app.include_router(spaces_router, prefix="/api/spaces", tags=["spaces"])
app.include_router(documents_router, prefix="/api/documents", tags=["documents"])
app.include_router(conversations_router, prefix="/api/conversations", tags=["conversations"])
app.include_router(messages_router, prefix="/api/messages", tags=["messages"])

@app.get("/")
def read_root():
    return {"message": "Welcome to AI Tutor API"}