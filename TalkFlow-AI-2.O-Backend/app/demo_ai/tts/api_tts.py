from app.demo_ai.tts.base import BaseTTS


class APITTS(BaseTTS):

    def __init__(self):
        raise NotImplementedError("API TTS not implemented yet.")

    def speak(self, text: str):
        raise NotImplementedError("API TTS not implemented yet.")