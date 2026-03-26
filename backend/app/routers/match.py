import json, os
from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from app.schemas.match import (
    MatchRequest, MatchResponse,
    UploadMatchResponse,
    TopCompaniesResponse, CompanyMatch,
)
from app.services.matcher import compute_match
from app.services.file_parser import parse_file

router = APIRouter(prefix="/api/v1/match", tags=["Match"])

ALLOWED_TYPES = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/msword",
    "text/plain",
]

# Load companies once at startup
_COMPANIES_PATH = os.path.join(os.path.dirname(__file__), "../../data/companies.json")

def _load_companies() -> list[dict]:
    with open(_COMPANIES_PATH, "r", encoding="utf-8") as f:
        return json.load(f)

COMPANIES = _load_companies()


# ── Existing endpoint (text input) — unchanged ────────────────────────────────
@router.post("/text", response_model=MatchResponse)
async def match_from_text(request: MatchRequest):
    """US-02 original: plain text resume + JD"""
    result = compute_match(request.resume_text, request.jd_text)
    return result


# ── Option 1: Upload resume file + JD file or text ───────────────────────────
@router.post("/upload-both", response_model=UploadMatchResponse)
async def match_upload_both(
    resume: UploadFile = File(...),
    jd_file: UploadFile | None = File(default=None),
    jd_text: str | None = Form(default=None),
):
    """
    Option 1 — Upload resume (PDF/DOCX/TXT) + JD (file or pasted text).
    Returns match percentage with full skill breakdown.
    """
    # Validate resume
    if resume.content_type not in ALLOWED_TYPES:
        raise HTTPException(400, "Resume must be PDF, DOCX, or TXT.")

    resume_bytes = await resume.read()
    try:
        resume_text = parse_file(resume_bytes, resume.content_type)
    except ValueError as e:
        raise HTTPException(400, str(e))

    if not resume_text or len(resume_text) < 50:
        raise HTTPException(422, "Could not extract enough text from resume.")

    # Get JD text — from file OR pasted text
    if jd_file and jd_file.filename:
        if jd_file.content_type not in ALLOWED_TYPES:
            raise HTTPException(400, "JD must be PDF, DOCX, or TXT.")
        jd_bytes = await jd_file.read()
        try:
            jd_content = parse_file(jd_bytes, jd_file.content_type)
        except ValueError as e:
            raise HTTPException(400, str(e))
        jd_source = "file"
    elif jd_text and jd_text.strip():
        jd_content = jd_text.strip()
        jd_source = "text"
    else:
        raise HTTPException(400, "Provide JD as a file upload or pasted text.")

    if len(jd_content) < 30:
        raise HTTPException(422, "JD text is too short to analyze.")

    result = compute_match(resume_text, jd_content)

    return {
        **result,
        "resume_file_name": resume.filename,
        "jd_source": jd_source,
    }


# ── Option 2: Upload resume → match against all 40 companies ─────────────────
@router.post("/top-companies", response_model=TopCompaniesResponse)
async def match_top_companies(
    resume: UploadFile = File(...),
    top_n: int = Form(default=10),
):
    """
    Option 2 — Upload resume once, auto-match against 40 company JDs.
    Returns top N companies ranked by match score.
    """
    if resume.content_type not in ALLOWED_TYPES:
        raise HTTPException(400, "Resume must be PDF, DOCX, or TXT.")

    if top_n < 1 or top_n > 40:
        raise HTTPException(400, "top_n must be between 1 and 40.")

    resume_bytes = await resume.read()
    try:
        resume_text = parse_file(resume_bytes, resume.content_type)
    except ValueError as e:
        raise HTTPException(400, str(e))

    if not resume_text or len(resume_text) < 50:
        raise HTTPException(422, "Could not extract enough text from resume.")

    # Run resume against all 40 companies
    results = []
    for company in COMPANIES:
        score = compute_match(resume_text, company["jd"])
        results.append({
            "company_id":             company["id"],
            "company_name":           company["name"],
            "logo":                   company["logo"],
            "career_url":             company["career_url"],
            "final_match_percentage": score["final_match_percentage"],
            "skill_match_score":      score["skill_match_score"],
            "overall_semantic_score": score["overall_semantic_score"],
            "matched_skills":         score["matched_skills"],
            "missing_skills":         score["missing_skills"],
        })

    # Sort by final score descending, take top N
    results.sort(key=lambda x: x["final_match_percentage"], reverse=True)
    top = results[:top_n]

    # Add rank
    for i, r in enumerate(top):
        r["rank"] = i + 1

    return {
        "resume_file_name": resume.filename,
        "total_companies":  len(COMPANIES),
        "top_matches":      top,
    }