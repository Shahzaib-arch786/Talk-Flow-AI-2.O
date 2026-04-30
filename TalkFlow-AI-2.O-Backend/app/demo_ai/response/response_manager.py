import os
from openai import OpenAI

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


class ResponseManager:

    def __init__(self):
        pass

    # ==========================
    # Language Detection
    # ==========================
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

    # ==========================
    # Prompt Builder
    # ==========================

    

    def build_system_prompt(self, user_text: str) -> str:

        base_prompt = """
    You are TalkFlow AI — a real-time voice-based AI assistant.

    You are speaking to a user who is exploring this product for the first time.

    ==============================
    🎯 YOUR GOAL
    ==============================
    - Help the user understand TalkFlow AI
    - Answer clearly no matter how the question is asked
    - Demonstrate intelligence, clarity, and confidence

    ==============================
    🧠 BEHAVIOR RULES
    ==============================
    - Understand user intent even if phrasing is unclear
    - If question is vague → interpret it smartly
    - If question is incomplete → respond helpfully anyway
    - Never say “I don’t understand” immediately — try to infer meaning

    ==============================
    🗣️ LANGUAGE STYLE
    ==============================
    - If user speaks Urdu/Roman Urdu → reply in Urdu + English mix
    - Otherwise use simple English
    - Keep tone natural and human-like

    ==============================
    📌 RESPONSE STYLE
    ==============================
    - Keep answers concise (2–4 lines)
    - Explain step-by-step if needed
    - Use simple examples when helpful

    ==============================
    🚫 RESTRICTIONS
    ==============================
    - Do NOT mention restaurant or old system
    - Do NOT say “I am an AI model”
    - Avoid generic answers

    ==============================
    💡 PRODUCT KNOWLEDGE
    ==============================
    TalkFlow AI is a voice-based AI SaaS platform that:
    - Converts speech to text
    - Understands user intent using AI
    - Generates intelligent responses
    - Converts responses back to voice
    - Works in real-time conversation loop
    - Supports Urdu + English
    - Can be customized for businesses

    ==============================
    🧪 EXAMPLES
    ==============================

    User: "yeh kya karta hai?"
    → Explain simply what TalkFlow AI does

    User: "kaise kaam karta hai?"
    → Explain step-by-step pipeline

    User: "business ke liye kaise use hoga?"
    → Explain SaaS + automation

    User: "kya yeh chatbot hai?"
    → Compare and explain difference

    ==============================
    IMPORTANT:
    Always try to understand user intent, even if wording is messy or unclear.
    """
        
        if self.is_urdu(user_text):
            base_prompt += "\nRespond in Urdu + Roman Urdu mix."
        else:
            base_prompt += "\nRespond in clear English."

        return base_prompt

    # ==========================
    # Main Response Function
    # ==========================
    def generate_response(self, intent_result: dict, user_text: str, state):

        try:
            # ✅ Add user message to memory
            state.add_user_message(user_text)

            # ✅ Build system prompt
            system_prompt = self.build_system_prompt(user_text)

            messages = [
                {"role": "system", "content": system_prompt}
            ]

            # ✅ Inject memory (last N messages)
            messages.extend(state.get_history())

            # ✅ GPT Call
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=messages,
                temperature=0.7
            )

            ai_text = response.choices[0].message.content.strip()

            # ==========================
            # Response Cleanup
            # ==========================

            # Limit length (voice-friendly)
            if len(ai_text) > 300:
                ai_text = ai_text[:300] + "..."

            # Remove weird formatting
            ai_text = ai_text.replace("\n\n", "\n")

            # ==========================
            # Save AI response to memory
            # ==========================
            state.add_ai_message(ai_text)

            return ai_text

        except Exception as e:
            print("GPT ERROR:", e)

            # Fallback response
            fallback = "Sorry, thori technical issue ho raha hai. Aap dobara try karein."

            return fallback