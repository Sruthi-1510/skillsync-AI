import fitz
import docx
import io

def parse_file(file_bytes: bytes, content_type: str) -> str:
    if content_type == "application/pdf":
        return _parse_pdf(file_bytes)
    elif content_type in [
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/msword",
    ]:
        return _parse_docx(file_bytes)
    elif content_type in ["text/plain", "text/txt"]:
        return file_bytes.decode("utf-8", errors="ignore")
    else:
        raise ValueError(f"Unsupported file type: {content_type}")

def _parse_pdf(file_bytes: bytes) -> str:
    doc = fitz.open(stream=file_bytes, filetype="pdf")
    text = ""
    for page in doc:
        text += page.get_text("text")
    doc.close()
    return text.strip()

def _parse_docx(file_bytes: bytes) -> str:
    doc = docx.Document(io.BytesIO(file_bytes))
    return "\n".join([para.text for para in doc.paragraphs]).strip()