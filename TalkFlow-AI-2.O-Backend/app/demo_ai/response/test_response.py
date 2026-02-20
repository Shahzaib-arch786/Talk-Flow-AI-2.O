from app.demo_ai.intent.predict import IntentClassifier
from app.demo_ai.response.response_manager import ResponseManager
from app.demo_ai.memory.conversation_state import ConversationManager

# Initialize modules
intent_model = IntentClassifier()
response_manager = ResponseManager()
conversation_manager = ConversationManager()

session_id = "test_user"

print("=== TalkFlow AI Manual Test ===")
print("Type 'exit' to stop.\n")

while True:
    user_input = input("You: ")

    if user_input.lower() == "exit":
        break

    # Get user state
    state = conversation_manager.get_state(session_id)

    # Predict intent
    intent_result = intent_model.predict(user_input)

    print("Intent Result:", intent_result)

    # Generate response (NOW WITH STATE)
    response = response_manager.generate_response(
        intent_result,
        user_input,
        state
    )

    print("AI:", response)
