import google.generativeai as genai
import os, json, re
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# ✅ Stable working model
model = genai.GenerativeModel("gemini-1.5-flash-latest")


def generate_roadmap(missing_skills, target_role, timeline_weeks):

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

Generate a structured {timeline_weeks}-week learning roadmap.

Return ONLY valid JSON:
{{
  "target_role": "{target_role}",
  "total_weeks": {timeline_weeks},
  "summary": "Short summary",
  "roadmap": [
    {{
      "week": "Week 1-2",
      "topic": "Skill",
      "description": "What to learn",
      "resources": ["Resource1", "Resource2"],
      "project": "Mini project"
    }}
  ]
}}
"""

    try:
        response = model.generate_content(prompt)
        raw = response.text.strip()

        # Clean markdown
        raw = re.sub(r"^```json\s*", "", raw)
        raw = re.sub(r"^```\s*", "", raw)
        raw = re.sub(r"\s*```$", "", raw).strip()

        data = json.loads(raw)

        # ✅ Ensure schema safety
        return {
            "target_role": data.get("target_role", target_role),
            "total_weeks": data.get("total_weeks", timeline_weeks),
            "summary": data.get("summary", "Generated roadmap"),
            "roadmap": data.get("roadmap", []),
        }

    except Exception as e:
        return {
            "target_role": target_role,
            "total_weeks": timeline_weeks,
            "summary": f"Generation failed: {str(e)}",
            "roadmap": [],
        }