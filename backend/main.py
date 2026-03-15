from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import fitz
import uuid, os, shutil

load_dotenv()

app = FastAPI(title="SkillSync API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080", "http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

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

    file_id   = str(uuid.uuid4())
    file_path = f"{UPLOAD_DIR}/{file_id}.pdf"
    with open(file_path, "wb") as f:
        shutil.copyfileobj(file.file, f)

    doc  = fitz.open(file_path)
    text = ""
    for page in doc:
        text += page.get_text("text")
    doc.close()

    if not text.strip():
        raise HTTPException(
            status_code=422,
            detail="Could not extract text. Use a text-based PDF, not a scanned image."
        )

    return {
        "resume_id": file_id,
        "raw_text":  text,
        "message":   "Resume uploaded and text extracted successfully"
    }