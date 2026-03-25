from fastapi import APIRouter, HTTPException
from app.schemas.roadmap import RoadmapRequest, RoadmapResponse
from app.services.roadmap_generator import generate_roadmap

router = APIRouter(prefix="/api/v1/roadmap", tags=["Roadmap"])


@router.post("/generate", response_model=RoadmapResponse)
async def generate_learning_roadmap(request: RoadmapRequest):
    """
    US-06: Takes missing_skills from US-02 match result
    and generates a personalized learning roadmap using Gemini.
    """
    if not request.missing_skills:
        raise HTTPException(
            status_code=400,
            detail="No missing skills provided. Run resume match first."
        )

    if request.timeline_weeks < 1 or request.timeline_weeks > 24:
        raise HTTPException(
            status_code=400,
            detail="Timeline must be between 1 and 24 weeks."
        )

    try:
        result = generate_roadmap(
            missing_skills=request.missing_skills,
            target_role=request.target_role,
            timeline_weeks=request.timeline_weeks,
        )
        return result
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Roadmap generation failed: {str(e)}"
        )