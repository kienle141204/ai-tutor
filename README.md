# AI Tutor

AI Tutor is a comprehensive educational platform that allows users to interact with documents through conversational AI. The system consists of a backend API built with FastAPI, a frontend interface built with React, and an AI agent component for document processing and conversational capabilities.

## Project Structure

```
ai-tutor/
├── backend/          # FastAPI backend service
├── frontend/         # React frontend application
└── ai-agent/         # AI processing components
```

## Features

- User authentication (registration, login, token refresh)
- Document management
- AI-powered conversational interface
- Space and conversation organization
- Modern, responsive UI with React and Tailwind CSS

## Architecture

### Backend (FastAPI)

The backend is built with FastAPI and provides RESTful APIs for:

- User management (registration, authentication, profile)
- Document handling
- Conversation management
- Space organization

Key technologies:
- FastAPI for API development
- SQLAlchemy for ORM
- MySQL for data persistence
- JWT for authentication
- Pydantic for data validation

### Frontend (React)

The frontend is built with React and provides:

- User authentication interface
- Dashboard for managing documents and conversations
- Chat interface for interacting with AI
- Responsive design with Tailwind CSS

Key technologies:
- React with Vite
- React Router for navigation
- Tailwind CSS for styling
- Lucide React for icons

### AI Agent

The AI agent component handles:

- Document processing (PDF, DOCX, etc.)
- Vector embedding and storage
- Conversational AI with multiple providers (OpenAI, Google Gemini)
- Retrieval-Augmented Generation (RAG)

Key technologies:
- LangChain for AI workflow management
- ChromaDB for vector storage
- Multiple AI providers (OpenAI, Google Gemini)
- Document parsing libraries (docx2txt, pypdf)

## Getting Started

### Prerequisites

- Python 3.8+
- Node.js 16+
- MySQL database
- API keys for AI services (OpenAI, Google Gemini)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:
   - On Windows: `venv\Scripts\activate`
   - On macOS/Linux: `source venv/bin/activate`

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Update the database configuration in `backend/database.py` with your MySQL credentials.

6. Run the application:
   ```bash
   uvicorn main:app --reload
   ```

The API will be available at `http://localhost:8000`.

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:5173`.

### AI Agent Setup

1. Navigate to the ai-agent directory:
   ```bash
   cd ai-agent
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:
   - On Windows: `venv\Scripts\activate`
   - On macOS/Linux: `source venv/bin/activate`

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Create a `.env` file with your API keys:
   ```
   OPENAI_API_KEY=your_openai_api_key
   GOOGLE_API_KEY=your_google_api_key
   ```

## API Documentation

Once the backend is running, you can access:

- Interactive API documentation: `http://localhost:8000/docs`
- Alternative API documentation: `http://localhost:8000/redoc`

## Database Schema

The application uses the following main entities:

- **Users**: User accounts with authentication
- **Spaces**: Organizational units for documents
- **Documents**: Uploaded files for AI processing
- **Conversations**: Chat histories with the AI
- **Messages**: Individual messages within conversations

## Development

### Backend Development

The backend follows a standard FastAPI structure:
- `main.py`: Application entry point
- `models/`: Database models
- `schemas/`: Pydantic schemas for validation
- `routers/`: API route definitions
- `crud/`: Database operations
- `core/`: Security and configuration

### Frontend Development

The frontend follows a component-based structure:
- `src/components/`: Reusable UI components
- `src/pages/`: Page components
- `src/services/`: API service functions
- `src/contexts/`: React context providers

## Deployment

For production deployment, you would typically:

1. Set up a production database
2. Configure environment variables for all services
3. Deploy the backend using a WSGI server like Gunicorn
4. Build and deploy the frontend as static files
5. Set up a reverse proxy (nginx) to serve both services
6. Deploy the AI agent component on a suitable server

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License

[Add your license information here]