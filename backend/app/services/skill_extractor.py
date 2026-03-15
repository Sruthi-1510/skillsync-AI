import spacy

nlp = spacy.load("en_core_web_sm")

KNOWN_SKILLS = {

    # ---------------- Programming Languages ----------------
    "python", "java", "javascript", "typescript", "c", "c++", "c#", "go", "rust",
    "swift", "kotlin", "php", "ruby", "scala", "r", "matlab", "dart",

    # ---------------- Frontend Development ----------------
    "html", "css", "sass", "less",
    "react", "angular", "vue", "svelte",
    "next.js", "nuxt.js",
    "vite", "webpack", "babel",
    "tailwind", "bootstrap", "material ui",

    # ---------------- Backend Development ----------------
    "node.js", "express", "nestjs",
    "spring", "spring boot",
    "django", "flask", "fastapi",
    "laravel", "ruby on rails",
    "graphql", "rest api",

    # ---------------- Databases ----------------
    "mysql", "postgresql", "mongodb", "redis",
    "sqlite", "firebase", "oracle", "cassandra",
    "dynamodb", "neo4j",

    # ---------------- Data Science & AI ----------------
    "machine learning", "deep learning", "nlp", "computer vision",
    "pandas", "numpy", "scikit-learn", "tensorflow", "pytorch",
    "keras", "xgboost", "lightgbm",
    "data analysis", "data visualization",
    "matplotlib", "seaborn", "plotly",
    "hugging face", "transformers",

    # ---------------- Big Data ----------------
    "hadoop", "spark", "pyspark", "kafka",
    "databricks", "airflow",

    # ---------------- Cloud Computing ----------------
    "aws", "azure", "gcp",
    "lambda", "ec2", "s3",
    "cloud formation", "cloud functions",
    "cloud computing",

    # ---------------- DevOps & Infrastructure ----------------
    "docker", "kubernetes", "helm",
    "jenkins", "github actions", "gitlab ci",
    "terraform", "ansible",
    "ci/cd", "infrastructure as code",

    # ---------------- Operating Systems & Networking ----------------
    "linux", "unix", "bash",
    "computer networks", "network security",
    "tcp/ip",

    # ---------------- Cybersecurity ----------------
    "penetration testing", "ethical hacking",
    "cryptography", "oauth", "jwt",
    "cybersecurity",

    # ---------------- Software Engineering Concepts ----------------
    "data structures", "algorithms",
    "object oriented programming", "oop",
    "design patterns",
    "system design",
    "microservices",
    "distributed systems",

    # ---------------- Mobile Development ----------------
    "android", "ios",
    "flutter", "react native",
    "android studio",

    # ---------------- Testing ----------------
    "unit testing", "integration testing",
    "selenium", "jest", "pytest",
    "cypress",

    # ---------------- Tools ----------------
    "git", "github", "gitlab",
    "jira", "confluence",
    "figma", "postman",
    "docker desktop",

    # ---------------- Business / Analytics ----------------
    "power bi", "tableau",
    "excel", "business intelligence",

    # ---------------- Methodologies ----------------
    "agile", "scrum", "kanban",
    "test driven development",

    # ---------------- Competitive Programming / Learning ----------------
    "leetcode", "codeforces",

    # ------------------ Soft Skills (for fun) ----------------
    "communication", "teamwork", "leadership", "problem solving",
"critical thinking", "adaptability", "time management",
"collaboration", "decision making", "conflict resolution",
"project management", "presentation skills",
"negotiation", "emotional intelligence",
"stakeholder management", "analytical thinking",
"creativity", "attention to detail",
"organizational skills", "self motivation",
"mentoring", "coaching" ,
}

def extract_skills(text: str) -> list[str]:
    text_lower = text.lower()
    found = set()

    for skill in KNOWN_SKILLS:
        if skill in text_lower:
            found.add(skill.title())

    doc = nlp(text[:5000])
    for ent in doc.ents:
        if ent.label_ in ("ORG", "PRODUCT"):
            candidate = ent.text.strip().lower()
            if candidate in KNOWN_SKILLS:
                found.add(ent.text.strip().title())

    return sorted(list(found))