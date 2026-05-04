from app.ai_core.base_response import BaseResponse
from app.business_ai.context_builder import build_business_context
from app.rag.service import retrieve_relevant_chunks, search_faq
from app.actions.detector import detect_action
from app.actions.service import (
    create_action_request,
    get_actions
)


class BusinessResponseManager(BaseResponse):

    def is_urdu(self, text: str) -> bool:
        text_lower = text.lower()

        # Urdu script detection
        if any('\u0600' <= c <= '\u06FF' for c in text):
            return True

        # Roman Urdu keywords
        roman_keywords = [
            "kya", "hai", "kaise", "mujhe", "tum",
            "yeh", "kyun", "kar", "raha", "ho", "hain"
        ]

        return any(word in text_lower for word in roman_keywords)

    def generate_response(
        self,
        intent_result,
        user_text,
        state,
        business_data,
        db=None
    ):
        try:
            print("STEP 1: generate_response started")
            print("User text:", user_text)
            # =========================================
            # SYSTEM PROMPT
            # =========================================
            system_prompt = """
You are a professional AI assistant for a business.

Rules:
- Answer ONLY using provided business information
- Use FAQ data first
- Use uploaded document data if FAQ doesn't answer
- Keep responses short, professional and accurate
- Match user's language
- If information is unavailable say:
'I don't have that information'
"""         

            
            print("STEP 2: building business context")
            business_context = build_business_context(business_data)
            print("Business context built:", business_context)
            system_prompt += "\n\n" + business_context

            # =========================================
            # GET BUSINESS ID
            # =========================================
            business = business_data.get("business")
            print("STEP 3: extracting business ID")
            if isinstance(business, dict):
                business_id = business.get("id")
            else:
                business_id = business.id
            print("Business ID:", business_id)

            greetings = [
                "hello",
                "hi",
                "hey",
                "salam",
                "assalamualaikum",
                "مرحبا",
                "اسلام علیکم",
                "thank you",
                "thanks",
                "شکریہ"
            ]

            user_lower = user_text.lower().strip()

            if user_lower in greetings:
                if self.is_urdu(user_text):
                    return "السلام علیکم! میں آپ کی کس طرح مدد کر سکتا ہوں؟"

                return "Hello! Welcome to our business. How may I assist you today?"

            # =========================================
            # ACTION FLOW
            # =========================================
            if db:
                print("STEP 4: fetching actions")
                actions = get_actions(db, business_id)
                print("Available actions:", actions)
                detected_action = detect_action(
                    user_text,
                    actions
                )
                print("Detected action:", detected_action)
                # STEP 1 → user starts new action
                if detected_action and not state.pending_action:
                    print("Step 5:New action detected, initializing pending action state")
                    state.pending_action = {
                        "action_name": detected_action,
                        "details": user_text
                    }

                    print("ACTION DETECTED")

                    if self.is_urdu(user_text):
                        return f"""
                    میں آپ کی {detected_action} میں مدد کر سکتا ہوں۔

                    براہ کرم مزید تفصیلات فراہم کریں۔
                    """

                    return f"""
                    I can help you with {detected_action.lower()}.

                    Please provide more details to continue.
                    """

                # STEP 2 → user provides more details
                elif state.pending_action and not self.is_confirmation(user_text):
                    state.pending_action["details"] += f" | {user_text}"

                    print("COLLECTING ACTION DETAILS")

                    if self.is_urdu(user_text):
                        return f"""
                    میرے پاس یہ تفصیلات ہیں:

                    {state.pending_action['details']}

                    کنفرم کرنے کیلئے "yes" لکھیں
                    یا مزید تفصیلات دیں۔
                    """

                    return f"""
                    I have these details:

                    {state.pending_action['details']}

                    Reply with:
                    'yes' to confirm
                    or provide more details.
                    """

                # STEP 3 → final confirmation
                elif state.pending_action and self.is_confirmation(user_text):
                    action_name = state.pending_action["action_name"]
                    full_query = state.pending_action["details"]

                    create_action_request(
                        db=db,
                        business_id=business_id,
                        action_name=action_name,
                        customer_query=full_query
                    )

                    state.pending_action = None

                    print("ACTION SAVED TO DB")

                    
                    if self.is_urdu(user_text):
                        return f"""
                    آپ کی '{action_name}' درخواست کامیابی سے جمع ہو گئی ہے۔

                    ہماری ٹیم جلد آپ سے رابطہ کرے گی۔
                    """

                    return f"""
                    Your request for '{action_name}' has been submitted successfully.

                    Our team will contact you shortly.
                    """
                

            # =========================================
            # FAQ SEARCH
            # =========================================
            if db:
                print("STEP 6: searching FAQ")
                faq_answer = search_faq(
                    query=user_text,
                    business_id=business_id,
                    db=db
                )

                if faq_answer:
                    print("FAQ HIT")
                    return faq_answer

            # =========================================
            # RAG SEARCH
            # =========================================
            if db:
                print("STEP 7: RAG search for relevant documents")
                rag_context = retrieve_relevant_chunks(
                    query=user_text,
                    business_id=business_id,
                    db=db
                )

                if rag_context and len(rag_context.strip()) > 20:
                    print("RAG HIT")
                    system_prompt += f"\n\nDocument Context:\n{rag_context}"

            # =========================================
            # GPT FALLBACK
            # =========================================
            print("STEP 8: no FAQ/RAG results, falling back to GPT")
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

    # =========================================
    # STREAM RESPONSE
    # =========================================
    def generate_stream_response(
    self,
    user_text,
    state,
    business_data
):
        try:
            print("STREAM STARTED")

            # FIRST build business context
            business_context = build_business_context(
                business_data
            )

            # THEN use it in prompt
            system_prompt = f"""
    You are a smart multilingual AI receptionist for businesses.

    Business Information:
    {business_context}

    Rules:
    - Respond naturally
    - Match user's language
    - Use business info only
    - Keep responses concise
    - If info unavailable say:
    'I don't have that information right now.'
    """

            # save user message
            state.add_user_message(user_text)

            messages = state.get_history()

            messages.append({
                "role": "user",
                "content": user_text
            })

            stream = super().generate_stream(
                system_prompt,
                messages
            )

            full_response = ""

            for chunk in stream:
                full_response += chunk
                yield chunk

            # save AI response after completion
            state.add_ai_message(full_response)

            print("STREAM SUCCESS")

        except Exception as e:
            print("Stream Response Error:", e)
            yield "Sorry, streaming failed."

    # =========================================
    # CONFIRMATION CHECK
    # =========================================
    def is_confirmation(self, text):
        confirmations = [
            "yes",
            "confirm",
            "okay",
            "ok",
            "done",
            "sure",
            "proceed",
            "book it"
        ]

        text = text.lower()

        return any(word in text for word in confirmations)
    

def handle_small_talk(self, text):
    text = text.lower().strip()

    greetings = [
        "hello",
        "hi",
        "hey",
        "good morning",
        "good evening",
        "assalamualaikum"
    ]

    thanks = [
        "thanks",
        "thank you"
    ]

    bye_words = [
        "bye",
        "goodbye"
    ]

    if text in greetings:
        return "Hello! How can I help you today?"

    if text in thanks:
        return "You're welcome! Let me know if you need anything else."

    if text in bye_words:
        return "Goodbye! Have a great day."

    return None