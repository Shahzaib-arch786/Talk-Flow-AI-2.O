from app.admin.business_model import Business, KnowledgeBase


# ==========================
# CREATE BUSINESS
# ==========================
def create_business(db, data, current_user):

    # deactivate old businesses
    db.query(Business).filter_by(
        user_id=current_user.id
    ).update({
        "is_active": False
    })

    business = Business(
        name=data["name"],
        description=data.get("description", ""),
        language=data.get("language", "EN"),
        user_id=current_user.id,
        is_active=True
    )

    db.add(business)
    db.commit()
    db.refresh(business)

    return business


# ==========================
# ADD KNOWLEDGE
# ==========================
def add_knowledge(db, data):

    kb = KnowledgeBase(
        business_id=data["business_id"],
        question=data["question"],
        answer=data["answer"]
    )

    db.add(kb)
    db.commit()
    db.refresh(kb)

    return kb


# ==========================
# GET BUSINESS DATA (🔥 IMPORTANT)
# ==========================
def get_business_data(db, business_id):
    business = db.query(Business).filter_by(
        id=business_id
    ).first()

    knowledge = db.query(KnowledgeBase).filter_by(
        business_id=business_id
    ).all()

    return {
        "business": {
            "id": business.id,
            "name": business.name,
            "description": business.description,
            "language": business.language,
        } if business else None,

        "knowledge": [
            {
                "id": item.id,
                "question": item.question,
                "answer": item.answer
            }
            for item in knowledge
        ]
    }


# ==========================
# GET ALL BUSINESSES
# ==========================
def get_all_businesses(db, current_user):
    return db.query(Business).filter_by(
        user_id=current_user.id
    ).order_by(Business.created_at.desc()).all()


# ==========================
# DELETE BUSINESS
# ==========================
def delete_business(db, business_id, current_user):

    business = db.query(Business).filter_by(
        id=business_id,
        user_id=current_user.id
    ).first()

    if not business:
        raise Exception("Business not found")

    # delete knowledge first
    db.query(KnowledgeBase).filter_by(
        business_id=business_id
    ).delete()

    db.delete(business)
    db.commit()

    return {
        "message": "Business deleted successfully"
    }


# ==========================
# DELETE KNOWLEDGE
# ==========================
def delete_knowledge(db, knowledge_id):

    knowledge = db.query(KnowledgeBase).filter_by(
        id=knowledge_id
    ).first()

    if not knowledge:
        raise Exception("Knowledge not found")

    db.delete(knowledge)
    db.commit()

    return {
        "message": "Knowledge deleted successfully"
    }