from app.admin.business_model import Business, KnowledgeBase


# ==========================
# CREATE BUSINESS
# ==========================
def create_business(db, data, current_user):

    business = Business(
        name=data["name"],
        description=data.get("description", ""),
        language=data.get("language", "EN"),
        user_id=current_user.id  # 🔥 LINK TO USER
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

    business = db.query(Business).filter_by(id=business_id).first()

    knowledge = db.query(KnowledgeBase).filter_by(
        business_id=business_id
    ).all()

    return {
        "business": business,
        "knowledge": knowledge
    }