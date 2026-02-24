from app.demo_ai.tts.tts_manager import TextToSpeech


if __name__ == "__main__":

    tts = TextToSpeech()

    while True:
        text = input("Enter text to speak (or 'exit'): ")

        if text.lower() == "exit":
            break

        tts.speak(text)