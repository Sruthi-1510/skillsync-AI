from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from app.routers import match, roadmap
from app.services.skill_extractor import extract_skills
import fitz
import uuid, os, shutil
from app.routers import chat

load_dotenv()

app = FastAPI(title="SkillSync API", version="1.0.0")
# app.include_router(chat.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(match.router)
app.include_router(roadmap.router)
app.include_router(chat.router)
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@app.get("/")
def root():
    return {"message": "SkillSync API is running"}


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/api/v1/resume/upload")
async def upload_resume(file: UploadFile = File(...)):

    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Only PDF files are accepted")

    file_id = str(uuid.uuid4())
    file_path = f"{UPLOAD_DIR}/{file_id}.pdf"

    with open(file_path, "wb") as f:
        shutil.copyfileobj(file.file, f)

    doc = fitz.open(file_path)
    text = ""
    for page in doc:
        text += page.get_text("text")
    doc.close()

    if not text.strip():
        raise HTTPException(
            status_code=422,
            detail="Could not extract text. Use a text-based PDF, not a scanned image."
        )

    skills = extract_skills(text)

    return {
        "resume_id": file_id,
        "raw_text": text,
        "extracted_skills": skills,
        "skill_count": len(skills),
        "message": "Resume parsed successfully"
    }


from google import genai

# genai.configure(api_key="GEMINI_API_KEY")

# for m in genai.list_models():
#     print(m.name)