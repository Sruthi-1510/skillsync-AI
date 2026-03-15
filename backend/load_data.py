import pandas as pd

companies = pd.read_csv("../data/companies.csv")
roles = pd.read_csv("../data/roles.csv")
skills = pd.read_csv("../data/skills.csv")
jobs = pd.read_csv("../data/job_requirements.csv")

print("Companies:", companies.shape)
print("Roles:", roles.shape)
print("Skills:", skills.shape)
print("Jobs:", jobs.shape)