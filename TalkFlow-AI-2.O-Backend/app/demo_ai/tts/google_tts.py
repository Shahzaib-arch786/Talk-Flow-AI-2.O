import os
from gtts import gTTS
from app.demo_ai.tts.base import BaseTTS


class GoogleTTS(BaseTTS):

    def generate_audio(self, text: str, session_id: str) -> str:

        filename = f"{session_id}.mp3"
        file_path = os.path.join("static/audio", filename)

        tts = gTTS(text=text, lang="ur")
        tts.save(file_path)

        return f"/static/audio/{filename}"