from app.admin.business_model import Business


def get_user_business(db, user_id):
    return db.query(Business).filter_by(user_id=user_id, is_active=True).first()

