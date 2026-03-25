import google.generativeai as genai
import os, json, re
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-1.5-flash")


def generate_roadmap(
    missing_skills: list[str],
    target_role: str,
    timeline_weeks: int,
) -> dict:

    if not missing_skills:
        return {
            "target_role": target_role,
            "total_weeks": 0,
            "summary": "No missing skills found. You are a strong match!",
            "roadmap": [],
        }

    skills_str = ", ".join(missing_skills)

    prompt = f"""
You are a career coach and technical mentor. A student wants to become a {target_role}.

They are currently missing these skills: {skills_str}

Generate a structured {timeline_weeks}-week learning roadmap to help them learn these skills.

Return ONLY a valid JSON object in this exact format, no extra text, no markdown:
{{
  "target_role": "{target_role}",
  "total_weeks": {timeline_weeks},
  "summary": "A 2-sentence overview of the learning plan",
  "roadmap": [
    {{
      "week": "Week 1-2",
      "topic": "Skill name",
      "description": "What they will learn and why it matters",
      "resources": ["Resource 1", "Resource 2", "Resource 3"],
      "project": "A small hands-on project to apply the skill"
    }}
  ]
}}

Rules:
- Group related skills together into the same week block
- Keep resources free and beginner-friendly (official docs, YouTube, freeCodeCamp etc.)
- Each project must be specific and practical
- Cover all the missing skills: {skills_str}
- Return pure JSON only, no markdown code blocks
"""

    response = model.generate_content(prompt)
    raw = response.text.strip()

    # Strip markdown code blocks if Gemini adds them anyway
    raw = re.sub(r"^```json\s*", "", raw)
    raw = re.sub(r"^```\s*", "", raw)
    raw = re.sub(r"\s*```$", "", raw)
    raw = raw.strip()

    data = json.loads(raw)
    return data