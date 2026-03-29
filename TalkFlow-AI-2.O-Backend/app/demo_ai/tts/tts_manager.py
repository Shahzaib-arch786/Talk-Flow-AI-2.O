import os
import uuid
from gtts import gTTS

class TextToSpeech:

    def __init__(self):
        self.audio_folder = "static/audio"

        if not os.path.exists(self.audio_folder):
            os.makedirs(self.audio_folder)

    def generate_audio(self, text: str, session_id: str, lang="auto"):

        # 🔥 Auto detect Urdu vs English
        if lang == "auto":
            if any('\u0600' <= char <= '\u06FF' for char in text):
                language = "ur"
            else:
                language = "en"
        else:
            language = lang

        file_name = f"{session_id}_{uuid.uuid4().hex}.mp3"
        file_path = os.path.join(self.audio_folder, file_name)

        tts = gTTS(text=text, lang=language)
        tts.save(file_path)

        return f"/static/audio/{file_name}"