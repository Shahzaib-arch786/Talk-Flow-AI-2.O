from app.rag.service import retrieve_relevant_chunks


def get_rag_context(db, business_id, query):
    return retrieve_relevant_chunks(
        db,
        business_id,
        query
    )