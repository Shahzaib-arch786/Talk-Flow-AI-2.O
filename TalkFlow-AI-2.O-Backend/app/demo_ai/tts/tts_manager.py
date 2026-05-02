import os
import uuid
from dotenv import load_dotenv
from elevenlabs.client import ElevenLabs

load_dotenv()


class TextToSpeech:
    def __init__(self):
        self.audio_folder = "static/audio"

        if not os.path.exists(self.audio_folder):
            os.makedirs(self.audio_folder)

        self.client = ElevenLabs(
            api_key=os.getenv("ELEVENLABS_API_KEY")
        )

        # Choose your voice ID
        self.voice_id = "EXAVITQu4vr4xnSDxMaL"  
        # replace later if you want another voice

    def generate_audio(self, text: str, session_id: str, lang="auto"):
        try:
            file_name = f"{session_id}_{uuid.uuid4().hex}.mp3"
            file_path = os.path.join(self.audio_folder, file_name)

            audio = self.client.text_to_speech.convert(
                voice_id=self.voice_id,
                model_id="eleven_multilingual_v2",
                text=text
            )

            with open(file_path, "wb") as f:
                for chunk in audio:
                    f.write(chunk)

            return f"/static/audio/{file_name}"

        except Exception as e:
            print("ELEVENLABS ERROR:", e)
            return None