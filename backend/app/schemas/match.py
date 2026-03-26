from pydantic import BaseModel, Field

# ── Existing US-02 (text input) ───────────────────────────────────────────────
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

# ── Option 1 — file upload response ──────────────────────────────────────────
class UploadMatchResponse(BaseModel):
    overall_semantic_score: float
    skill_match_score:      float
    final_match_percentage: float
    matched_skills:         list[str]
    missing_skills:         list[str]
    extra_skills:           list[str]
    resume_skill_count:     int
    jd_skill_count:         int
    resume_file_name:       str
    jd_source:              str       # "file" or "text"

# ── Option 2 — top companies response ────────────────────────────────────────
class CompanyMatch(BaseModel):
    rank:                   int
    company_id:             int
    company_name:           str
    logo:                   str
    career_url:             str
    final_match_percentage: float
    skill_match_score:      float
    overall_semantic_score: float
    matched_skills:         list[str]
    missing_skills:         list[str]

class TopCompaniesResponse(BaseModel):
    resume_file_name:  str
    total_companies:   int
    top_matches:       list[CompanyMatch]