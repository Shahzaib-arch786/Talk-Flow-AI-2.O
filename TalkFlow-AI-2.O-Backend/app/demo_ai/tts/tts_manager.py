import re
from app.demo_ai.tts.local_tts import LocalTTS
from app.demo_ai.tts.google_tts import GoogleTTS


class TextToSpeech:

    def __init__(self):
        self.english_engine = LocalTTS()
        self.urdu_engine = GoogleTTS()

    def contains_urdu(self, text):
        return bool(re.search(r'[\u0600-\u06FF]', text))

    def speak(self, text: str):

        if self.contains_urdu(text):
            self.urdu_engine.speak(text)
        else:
            self.english_engine.speak(text)