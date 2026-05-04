class ConversationState:
    def __init__(self):
        self.message = []
        self.pending_action = None   # NEW
        self.history = []

    def add_user_message(self, text):
        self.history.append({"role": "user", "content": text})

    def add_ai_message(self, text):
        self.history.append({"role": "assistant", "content": text})

    def get_history(self):
        return self.history[-10:]  # limit to last 10 messages


class ConversationManager:
    def __init__(self):
        self.sessions = {}

    def get_state(self, session_id: str):
        if session_id not in self.sessions:
            self.sessions[session_id] = ConversationState()
        return self.sessions[session_id]