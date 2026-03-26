from fastapi import APIRouter, HTTPException
from app.schemas.roadmap import RoadmapRequest, RoadmapResponse
from app.services.roadmap_generator import generate_roadmap

router = APIRouter(prefix="/api/v1/roadmap", tags=["Roadmap"])


@router.post("/generate", response_model=RoadmapResponse)
async def generate_learning_roadmap(request: RoadmapRequest):

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

    result = generate_roadmap(
        missing_skills=request.missing_skills,
        target_role=request.target_role,
        timeline_weeks=request.timeline_weeks,
    )

    # ✅ Handle failure cleanly
    if result["roadmap"] == [] and "failed" in result["summary"].lower():
        raise HTTPException(status_code=500, detail=result["summary"])

    return result