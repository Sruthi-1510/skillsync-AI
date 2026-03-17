import google.generativeai as genai
import json
import os

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-1.5-flash")

def load_role_skills(role: str) -> list[str]:
    with open("skills_db.json", "r") as f:
        db = json.load(f)
    return db.get(role.lower(), [])

def detect_skill_gap(resume_skills: list[str], role: str) -> dict:

    role_skills = load_role_skills(role)

    if not role_skills:
        return {"error": f"Role '{role}' not found in database"}
    prompt = f"""
You are a career mentor AI helping a student prepare for placements.

Resume Skills: {resume_skills}

Target Role: {role}

Industry Skills Required: {role_skills}

Tasks:
1. Identify which required skills are missing from the resume
2. Rank them by importance (High / Medium / Low)
3. Explain in one line why each skill matters

Return ONLY valid JSON in this exact format, nothing else:
{{
  "missing_skills": [
    {{
      "skill": "skill name",
      "importance": "High",
      "reason": "one line explanation"
    }}
  ],
  "matched_skills": ["skill1", "skill2"],
  "summary": "one sentence overall assessment"
}}
"""

    response = model.generate_content(prompt)
    text = response.text.strip()

    if text.startswith("```"):
        text = text.split("```")[1]
        if text.startswith("json"):
            text = text[4:]

    return json.loads(text)