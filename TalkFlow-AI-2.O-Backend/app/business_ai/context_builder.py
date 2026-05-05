def build_business_context(business_data):
    business = business_data["business"]
    knowledge = business_data["knowledge"]

    if not business:
        return "No business information available."

    context = f"""
Business Name: {business.get("name", "")}

Description:
{business.get("description", "")}

Knowledge Base:
"""

    for item in knowledge:
        context += f"""
Q: {item.get("question", "")}
A: {item.get("answer", "")}
"""

    return context