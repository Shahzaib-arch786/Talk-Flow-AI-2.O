import openai
import os

openai.api_key = os.getenv("OPENAI_API_KEY")

class OpenAIWhisper:
    def transcribe(self, audio_path):
        with open(audio_path, "rb") as audio:
            response = openai.audio.transcriptions.create(
                model="whisper-1",
                file=audio,
                language="ur",
            )
        return response.text