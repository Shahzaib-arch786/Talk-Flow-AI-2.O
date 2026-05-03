from app.ai_core.base_response import BaseResponse
from app.business_ai.context_builder import build_business_context
from app.rag.service import retrieve_relevant_chunks, search_faq


class BusinessResponseManager(BaseResponse):

    def generate_response(
        self,
        intent_result,
        user_text,
        state,
        business_data,
        db=None
    ):
        try:
            # =========================
            # Business Context
            # =========================
            system_prompt = """
You are a professional AI assistant for a business.

Rules:
- Answer ONLY using provided business information
- Use FAQ data first
- Use uploaded document data if FAQ doesn't answer
- Keep responses short, professional and accurate
- Match user's language (Urdu/English or any other language)
- If information is unavailable say:
'I don't have that information'
"""

            business_context = build_business_context(business_data)
            system_prompt += "\n\n" + business_context

            # =========================
            # Extract business ID safely
            # =========================
            business = business_data.get("business")

            if isinstance(business, dict):
                business_id = business.get("id")
            else:
                business_id = business.id

            # =========================
            # STEP 1 → FAQ SEARCH
            # fastest layer
            # =========================
            if db:
                faq_answer = search_faq(
                    query=user_text,
                    business_id=business_id,
                    db=db
                )

                if faq_answer:
                    print("FAQ HIT")
                    return faq_answer

            # =========================
            # STEP 2 → RAG SEARCH
            # only if FAQ fails
            # =========================
            if db:
                rag_context = retrieve_relevant_chunks(
                    query=user_text,
                    business_id=business_id,
                    db=db
                )

                if rag_context:
                    print("RAG HIT")
                    system_prompt += f"\n\nDocument Context:\n{rag_context}"

            # =========================
            # STEP 3 → GPT RESPONSE
            # =========================
            state.add_user_message(user_text)

            messages = state.get_history()
            messages.append({
                "role": "user",
                "content": user_text
            })

            response = super().generate(
                system_prompt,
                messages
            )

            state.add_ai_message(response)

            print("GPT HIT")

            return response

        except Exception as e:
            print("Response Manager Error:", e)
            return "Sorry, I'm having trouble accessing business information right now."

    # ======================================
    # STREAM RESPONSE (chat streaming)
    # ======================================
    def generate_stream_response(
        self,
        user_text,
        state,
        business_data
    ):
        try:
            system_prompt = """
You are a professional AI assistant for a business.
Use conversation history to maintain context.
Keep responses concise.
"""

            business_context = build_business_context(business_data)
            system_prompt += "\n\n" + business_context

            state.add_user_message(user_text)

            messages = state.get_history()

            stream = super().generate_stream(
                system_prompt,
                messages
            )

            full_response = ""

            for chunk in stream:
                full_response += chunk
                yield chunk

            state.add_ai_message(full_response)

        except Exception as e:
            print("Stream Response Error:", e)
            yield "Sorry, streaming failed."