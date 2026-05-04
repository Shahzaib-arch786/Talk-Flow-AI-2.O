import os
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)


def detect_action(user_text, actions):
    try:
        if not actions:
            return None

        action_names = [
            action["action_name"]
            for action in actions
        ]

        prompt = f"""
You are an AI intent detector.

User message:
"{user_text}"

Available actions:
{action_names}

Rules:
- User may speak in Urdu
- User may speak in Roman Urdu
- User may speak in English
- Return ONLY exact action name
- If no action matches return ONLY: NONE
"""

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0
        )

        detected = response.choices[0].message.content.strip()

        print("GPT ACTION DETECTED:", detected)

        if detected == "NONE":
            return None

        if detected in action_names:
            return detected

        return None

    except Exception as e:
        print("Action Detection Error:", e)
        return None