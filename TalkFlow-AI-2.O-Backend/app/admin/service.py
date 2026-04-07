from sqlalchemy import func
from app.admin.model import ConversationLog


def get_dashboard_data(db, business_id):

    # 🔹 Total Calls
    total_calls = db.query(ConversationLog).filter_by(
        business_id=business_id
    ).count()

    # 🔹 Avg Confidence
    avg_conf = db.query(func.avg(ConversationLog.confidence)).filter_by(
        business_id=business_id
    ).scalar() or 0

    # 🔹 Top Intents
    intents = db.query(
        ConversationLog.intent,
        func.count(ConversationLog.id)
    ).filter_by(
        business_id=business_id
    ).group_by(
        ConversationLog.intent
    ).all()

    total_intents = sum([i[1] for i in intents]) or 1

    top_intents = [
        {
            "intent": i[0],
            "percentage": round((i[1] / total_intents) * 100)
        }
        for i in intents
    ]

    # 🔹 Recent Calls
    recent = db.query(ConversationLog).filter_by(
        business_id=business_id
    ).order_by(
        ConversationLog.created_at.desc()
    ).limit(5).all()

    recent_calls = [
        {
            "time": str(r.created_at),
            "language": r.language,
            "intent": r.intent,
            "confidence": r.confidence
        }
        for r in recent
    ]

    return {
        "total_calls": total_calls,
        "avg_confidence": round(avg_conf, 2),
        "active_languages": ["EN", "UR"],
        "avg_processing_time": 1.2,
        "top_intents": top_intents,
        "recent_calls": recent_calls
    }