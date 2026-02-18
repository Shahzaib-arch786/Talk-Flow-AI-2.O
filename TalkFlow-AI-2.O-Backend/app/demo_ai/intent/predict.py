import joblib


class IntentClassifier:
    def __init__(self):
        self.model = joblib.load("app/demo_ai/intent/model.pkl")

    def predict(self, text: str) -> str:
        prediction = self.model.predict([text])
        return prediction[0]


# Quick test (optional)
if __name__ == "__main__":
    classifier = IntentClassifier()

    while True:
        user_input = input("You: ")
        intent = classifier.predict(user_input)
        print("Predicted Intent:", intent)
