from app.ai_core.base_response import BaseResponse
from app.business_ai.context_builder import build_business_context


class BusinessResponseManager(BaseResponse):

    def generate_response(self, intent_result, user_text, state, business_data):

        system_prompt = """
You are a professional AI assistant for a business.

Rules:
- Answer ONLY using the provided business information
- If answer is not available, say politely "I don't have that information"
- Keep responses clear, short, and helpful
- Match user's language (Urdu/English mix if needed)
"""

        # 🔥 Inject business context
        business_context = build_business_context(business_data)
        system_prompt += "\n\n" + business_context

        state.add_user_message(user_text)

        messages = state.get_history()
        messages.append({"role": "user", "content": user_text})

        response = super().generate(system_prompt, messages)

        state.add_ai_message(response)

        # ✅ THIS NOW WORKS
        return response
    
    def generate_stream_response(self, user_text, state, business_data):

        system_prompt = """
    You are a professional AI assistant for a business.
    Use conversation history to maintain context.
    """

        business_context = build_business_context(business_data)
        system_prompt += "\n\n" + business_context

        # ✅ store user message
        state.add_user_message(user_text)

        messages = state.get_history()

        stream = super().generate_stream(system_prompt, messages)

        full_response = ""

        for chunk in stream:
            full_response += chunk
            yield chunk

        # ✅ store AI response AFTER streaming
        state.add_ai_message(full_response)