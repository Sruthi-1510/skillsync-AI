from fastapi import APIRouter, HTTPException
from app.schemas.match import MatchRequest, MatchResponse
from app.services.matcher import compute_match

router = APIRouter(prefix="/api/v1/match", tags=["Match"])

@router.post("/text", response_model=MatchResponse)
async def match_from_text(request: MatchRequest):
    """
    US-02: Takes resume text + JD text and returns match analysis.
    Integrates with US-01: pass the raw_text from /resume/upload here.
    """
    result = compute_match(request.resume_text, request.jd_text)
    return result