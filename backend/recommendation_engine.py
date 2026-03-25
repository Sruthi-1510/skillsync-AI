import pandas as pd

jobs = pd.read_csv("../data/job_requirements.csv")

def match_jobs(skill_ids):

    scores = []

    for _, job in jobs.iterrows():

        required = list(map(int, job['required_skills'].split('|')))

        match = len(set(skill_ids) & set(required))

        scores.append(match)

    jobs['score'] = scores

    return jobs.sort_values(by='score', ascending=False)