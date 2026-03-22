import pandas as pd
import random

# constants
NUM_COMPANIES = 30
NUM_ROLES = 6
NUM_SKILLS = 40

job_id = 1
rows = []

for company_id in range(1, NUM_COMPANIES + 1):
    for role_id in range(1, NUM_ROLES + 1):

        # random required skills (4–6)
        required = random.sample(range(1, NUM_SKILLS + 1), random.randint(4,6))

        # random preferred skills (2–4)
        preferred = random.sample(range(1, NUM_SKILLS + 1), random.randint(2,4))

        rows.append({
            "job_id": job_id,
            "company_id": company_id,
            "role_id": role_id,
            "required_skills": "|".join(map(str, required)),
            "preferred_skills": "|".join(map(str, preferred))
        })

        job_id += 1

df = pd.DataFrame(rows)

df.to_csv("../data/job_requirements.csv", index=False)

print("✅ job_requirements.csv generated successfully with", len(df), "rows")