from pydantic import BaseModel, Field

class MatchRequest(BaseModel):
    resume_text: str = Field(..., min_length=50)
    jd_text:     str = Field(..., min_length=50)

class MatchResponse(BaseModel):
    overall_semantic_score: float
    skill_match_score:      float
    final_match_percentage: float
    matched_skills:         list[str]
    missing_skills:         list[str]
    extra_skills:           list[str]
    resume_skill_count:     int
    jd_skill_count:         int