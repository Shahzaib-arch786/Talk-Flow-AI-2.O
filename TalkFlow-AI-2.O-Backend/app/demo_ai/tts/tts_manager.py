from app.demo_ai.tts.local_tts import LocalTTS
from app.demo_ai.tts.google_tts import GoogleTTS


class TextToSpeech:

    def __init__(self):
        self.english_engine = LocalTTS()
        self.urdu_engine = GoogleTTS()

    def generate_audio(self, text: str, session_id: str) -> str:

        # detect Urdu characters
        contains_urdu = any('\u0600' <= ch <= '\u06FF' for ch in text)

        if contains_urdu:
            engine = self.urdu_engine
        else:
            engine = self.english_engine

        return engine.generate_audio(text, session_id)