import os
import math
import numpy as np
from app.rag.model import DocumentChunk
from app.rag.document_parser import extract_text
from sqlalchemy.orm import Session
from app.rag.embeddings import (
    generate_embedding,
    embedding_to_string,
    string_to_embedding
)
from app.admin.business_model import KnowledgeBase


# -----------------------
# chunk text
# -----------------------
def chunk_text(text, chunk_size=500):
    words = text.split()

    chunks = []

    for i in range(0, len(words), chunk_size):
        chunk = " ".join(words[i:i + chunk_size])
        chunks.append(chunk)

    return chunks


# -----------------------
# upload document
# -----------------------
def process_document_upload(db, business_id, file_path):
    text = extract_text(file_path)

    chunks = chunk_text(text)

    saved_chunks = 0

    for chunk in chunks:
        embedding = generate_embedding(chunk)

        doc_chunk = DocumentChunk(
            business_id=business_id,
            chunk_text=chunk,
            embedding=embedding_to_string(embedding)
        )

        db.add(doc_chunk)
        saved_chunks += 1

    db.commit()

    return {
        "message": "Document processed successfully",
        "chunks_saved": saved_chunks
    }


# -----------------------
# cosine similarity
# -----------------------
def cosine_similarity(vec1, vec2):
    vec1 = np.array(vec1)
    vec2 = np.array(vec2)

    denominator = (
        np.linalg.norm(vec1) *
        np.linalg.norm(vec2)
    )

    if denominator == 0:
        return 0

    return np.dot(vec1, vec2) / denominator


# -----------------------
# retrieve docs
# -----------------------
def retrieve_relevant_chunks(query: str, business_id: int, db: Session):
    try:
        query_vector = generate_embedding(query)

        documents = db.query(DocumentChunk).filter_by(
            business_id=business_id
        ).limit(100).all()

        if not documents:
            return ""

        scored_docs = []

        for doc in documents:
            score = cosine_similarity(
                query_vector,
                string_to_embedding(doc.embedding)
            )

            scored_docs.append({
                "text": doc.chunk_text,
                "score": score
            })

        scored_docs = sorted(
            scored_docs,
            key=lambda x: x["score"],
            reverse=True
        )

        top_docs = scored_docs[:3]

        final_context = "\n".join([
            doc["text"] for doc in top_docs
        ])

        return final_context

    except Exception as e:
        print("RAG Retrieval Error:", e)
        return ""
    

def search_faq(query: str, business_id: int, db):
    try:
        faqs = db.query(KnowledgeBase).filter_by(
            business_id=business_id
        ).all()

        query_words = set(query.lower().split())

        best_match = None
        best_score = 0

        for faq in faqs:
            question_words = set(
                faq.question.lower().split()
            )

            score = len(
                query_words.intersection(question_words)
            )

            if score > best_score:
                best_score = score
                best_match = faq

        if best_match and best_score >= 1:
            print("FAQ MATCH FOUND")
            return best_match.answer

        return None

    except Exception as e:
        print("FAQ Search Error:", e)
        return None