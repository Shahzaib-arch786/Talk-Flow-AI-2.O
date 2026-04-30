from app.demo_ai.memory.conversation_state import ConversationState

sessions = {}


def get_ai_session(session_id: str):
    if session_id not in sessions:
        sessions[session_id] = {
            "state": ConversationState()
        }
    return sessions[session_id]