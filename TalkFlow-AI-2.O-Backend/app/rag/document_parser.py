import os
from pypdf import PdfReader
from docx import Document


def extract_text(file_path):
    ext = os.path.splitext(file_path)[1].lower()

    if ext == ".pdf":
        return extract_pdf(file_path)

    elif ext == ".docx":
        return extract_docx(file_path)

    elif ext == ".txt":
        return extract_txt(file_path)

    else:
        raise Exception("Unsupported file type")


def extract_pdf(file_path):
    text = ""

    reader = PdfReader(file_path)

    for page in reader.pages:
        text += page.extract_text() + "\n"

    return text


def extract_docx(file_path):
    doc = Document(file_path)
    return "\n".join([para.text for para in doc.paragraphs])


def extract_txt(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        return f.read()