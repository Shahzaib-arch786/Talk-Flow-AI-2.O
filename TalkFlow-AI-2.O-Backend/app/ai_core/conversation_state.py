from typing import List, Dict


class ConversationState:
    def __init__(self):
        self.history: List[Dict] = []

    def add_user_message(self, text: str):
        self.history.append({"role": "user", "content": text})

    def add_ai_message(self, text: str):
        self.history.append({"role": "assistant", "content": text})

    def get_history(self):
        # 🔥 Limit memory (VERY IMPORTANT)
        return self.history[-10:]  # last 10 messages only

    def reset(self):
        self.history = []