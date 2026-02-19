import joblib
from preprocess import clean_text

MODEL_PATH = "app/demo_ai/intent/model.pkl"
CONFIDENCE_THRESHOLD = 0.50  # You can tune this later


class IntentClassifier:

    def __init__(self):
        self.model = joblib.load(MODEL_PATH)

    def predict(self, text: str):
        cleaned = clean_text(text)

        probabilities = self.model.predict_proba([cleaned])[0]
        classes = self.model.classes_

        max_index = probabilities.argmax()
        confidence = probabilities[max_index]
        predicted_intent = classes[max_index]

        if confidence < CONFIDENCE_THRESHOLD:
            return {
                "intent": "unknown",
                "confidence": round(float(confidence), 3)
            }

        return {
            "intent": predicted_intent,
            "confidence": round(float(confidence), 3)
        }


# Manual Testing
if __name__ == "__main__":
    classifier = IntentClassifier()

    while True:
        user_input = input("You: ")
        result = classifier.predict(user_input)
        print("AI:", result)
