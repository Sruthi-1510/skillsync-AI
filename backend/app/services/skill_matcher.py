# skill_matcher.py

import pandas as pd
from backend.app.services.skill_mapping import skill_mapping  # import the dictionary

# Load skills CSV once
skills = pd.read_csv("../data/skills.csv")

def get_skill_ids(resume_skills):
    """
    Converts a list of resume skills into skill IDs using the skills.csv
    and the skill_mapping dictionary for synonyms and variations.
    """
    skill_ids = []

    for skill in resume_skills:
        skill_lower = skill.lower()  # lowercase input for case-insensitive matching
        # map synonyms/abbreviations to canonical skill name
        canonical_skill = skill_mapping.get(skill_lower, skill)
        
        # find the row in skills.csv that matches the canonical skill name
        row = skills[skills['skill_name'].str.lower() == canonical_skill.lower()]

        if not row.empty:
            skill_ids.append(int(row.iloc[0]['skill_id']))

    return skill_ids