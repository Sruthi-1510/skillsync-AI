from fastapi import APIRouter
from pydantic import BaseModel
from app.services.chat_service import get_chat_response

router = APIRouter(prefix="/api/v1/chat", tags=["Chat"])

class ChatRequest(BaseModel):
    message: str

@router.post("")
def chat(req: ChatRequest):
    user_data = {
        "skills": ["Python", "HTML"],
        "missing_skills": ["React", "DSA"],
        "match_score": 65
    }

    reply = get_chat_response(req.message, user_data)

    return {"reply": reply}