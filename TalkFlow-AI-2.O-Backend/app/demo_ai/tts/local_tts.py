import os
import pyttsx3
from app.demo_ai.tts.base import BaseTTS


class LocalTTS(BaseTTS):

    def __init__(self):
        self.engine = pyttsx3.init()

    def generate_audio(self, text: str, session_id: str) -> str:

        filename = f"{session_id}.mp3"
        file_path = os.path.join("static/audio", filename)

        self.engine.save_to_file(text, file_path)
        self.engine.runAndWait()

        return f"/static/audio/{filename}"