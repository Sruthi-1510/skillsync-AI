from sklearn.metrics.pairwise import cosine_similarity
from app.services.embedder import get_embedding
import re

SKILL_KEYWORDS = [
    "python", "java", "javascript", "typescript", "react", "node.js", "nodejs",
    "fastapi", "django", "flask", "sql", "postgresql", "mysql", "mongodb",
    "redis", "docker", "kubernetes", "aws", "azure", "gcp", "git", "linux",
    "machine learning", "deep learning", "tensorflow", "pytorch", "pandas",
    "numpy", "scikit-learn", "nlp", "rest api", "graphql", "html", "css",
    "tailwind", "next.js", "vue", "angular", "c++", "c#", "rust", "go",
    "data structures", "algorithms", "system design", "agile", "scrum",
    "ci/cd", "devops", "spark", "hadoop", "tableau", "power bi", "excel",
]

def extract_skills(text: str) -> set[str]:
    text_lower = text.lower()
    return {
        skill for skill in SKILL_KEYWORDS
        if re.search(r'\b' + re.escape(skill) + r'\b', text_lower)
    }

def compute_match(resume_text: str, jd_text: str) -> dict:
    # Semantic similarity
    resume_emb = get_embedding(resume_text).reshape(1, -1)
    jd_emb     = get_embedding(jd_text).reshape(1, -1)
    semantic   = float(cosine_similarity(resume_emb, jd_emb)[0][0])
    semantic_pct = round(min(max(semantic * 100, 0), 100), 2)

    # Skill overlap
    resume_skills  = extract_skills(resume_text)
    jd_skills      = extract_skills(jd_text)
    matched        = sorted(resume_skills & jd_skills)
    missing        = sorted(jd_skills - resume_skills)
    extra          = sorted(resume_skills - jd_skills)
    skill_pct      = round(len(matched) / len(jd_skills) * 100, 2) if jd_skills else 0.0

    # Weighted final: 60% semantic + 40% skill overlap
    final = round(0.6 * semantic_pct + 0.4 * skill_pct, 2)

    return {
        "overall_semantic_score":  semantic_pct,
        "skill_match_score":       skill_pct,
        "final_match_percentage":  final,
        "matched_skills":          matched,
        "missing_skills":          missing,
        "extra_skills":            extra,
        "resume_skill_count":      len(resume_skills),
        "jd_skill_count":          len(jd_skills),
    }