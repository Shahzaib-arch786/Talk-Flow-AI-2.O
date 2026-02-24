import pyttsx3
from app.demo_ai.tts.base import BaseTTS


class LocalTTS(BaseTTS):

    def __init__(self):
        pass  # No persistent engine

    def speak(self, text: str):
        engine = pyttsx3.init()

        engine.setProperty("rate", 160)
        engine.setProperty("volume", 1.0)

        engine.say(text)
        engine.runAndWait()

        engine.stop()