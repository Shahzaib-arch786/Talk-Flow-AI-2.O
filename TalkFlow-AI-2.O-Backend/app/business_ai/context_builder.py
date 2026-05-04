def build_business_context(business_data):
    try:
        if not business_data:
            return "No business information available."

        # safely extract business
        business = business_data.get("business", {})
        knowledge = business_data.get("knowledge", [])

        context = f"""
Business Name: {business.get("name", "")}

Description:
{business.get("description", "")}

Language:
{business.get("language", "English")}

Knowledge Base:
"""

        # FAQs
        for item in knowledge:
            context += f"""
Q: {item.get("question", "")}
A: {item.get("answer", "")}
"""

        return context

    except Exception as e:
        print("Context Builder Error:", e)
        return "Business context unavailable."