from pydantic import BaseModel
from typing import List

class Week(BaseModel):
    week: str
    topic: str
    description: str
    resources: List[str]
    project: str

class RoadmapRequest(BaseModel):
    missing_skills: List[str]
    target_role: str = "Software Engineer"
    timeline_weeks: int = 8

class RoadmapResponse(BaseModel):
    target_role: str
    total_weeks: int
    summary: str
    roadmap: List[Week]