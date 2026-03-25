from pydantic import BaseModel

class Week(BaseModel):
    week: str
    topic: str
    description: str
    resources: list[str]
    project: str

class RoadmapRequest(BaseModel):
    missing_skills: list[str]
    target_role: str = "Software Engineer"
    timeline_weeks: int = 8

class RoadmapResponse(BaseModel):
    target_role: str
    total_weeks: int
    summary: str
    roadmap: list[Week]