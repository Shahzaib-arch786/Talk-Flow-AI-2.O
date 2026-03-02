from app.demo_ai.response.response_manager import ResponseManager
from app.demo_ai.memory.conversation_state import ConversationState

ai_sessions = {}

def get_ai_session(session_id: str):

    if session_id not in ai_sessions:
        ai_sessions[session_id] = {
            "manager": ResponseManager(),
            "state": ConversationState()
        }

    return ai_sessions[session_id]