def build_business_context(business_data):

    business = business_data["business"]
    knowledge = business_data["knowledge"]

    context = f"""
Business Name: {business.name}

Description:
{business.description}

Knowledge Base:
"""

    for item in knowledge:
        context += f"\nQ: {item.question}\nA: {item.answer}"

    return context