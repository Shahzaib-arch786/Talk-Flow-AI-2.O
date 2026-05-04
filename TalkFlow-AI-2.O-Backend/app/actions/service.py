from app.actions.model import BusinessAction, ActionRequest


# --------------------------
# CREATE ACTION
# --------------------------
def create_action(db, business_id, data):
    action = BusinessAction(
        business_id=business_id,
        name=data["action_name"],
        description=data["description"]
    )

    db.add(action)
    db.commit()
    db.refresh(action)

    return {
        "id": action.id,
        "business_id": action.business_id,
        "action_name": action.name,   # return frontend-friendly key
        "description": action.description
    }


# --------------------------
# GET ACTIONS
# --------------------------
def get_actions(db, business_id):
    actions = db.query(BusinessAction).filter(
        BusinessAction.business_id == business_id
    ).all()

    return [
        {
            "id": a.id,
            "business_id": a.business_id,
            "action_name": a.name,
            "description": a.description
        }
        for a in actions
    ]


# --------------------------
# DELETE ACTION
# --------------------------
def delete_action(db, action_id):
    action = db.query(BusinessAction).filter(
        BusinessAction.id == action_id
    ).first()

    if not action:
        return {"message": "Action not found"}

    db.delete(action)
    db.commit()

    return {"message": "Action deleted successfully"}


# --------------------------
# CREATE REQUEST
# --------------------------
def create_action_request(
    db,
    business_id,
    action_name,
    customer_query
):
    request = ActionRequest(
        business_id=business_id,
        action_name=action_name,
        customer_query=customer_query
    )

    db.add(request)
    db.commit()
    db.refresh(request)

    return request


# --------------------------
# GET REQUESTS
# --------------------------
def get_requests(db, business_id):
    return db.query(ActionRequest).filter(
        ActionRequest.business_id == business_id
    ).order_by(
        ActionRequest.created_at.desc()
    ).all()