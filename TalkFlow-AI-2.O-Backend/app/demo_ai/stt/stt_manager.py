from app.demo_ai.stt.local_whisper import LocalWhisperSTT
from app.demo_ai.stt.api_whisper import APIWhisperSTT


class SpeechToText:
    """
    STT Manager — selects provider.
    """

    def __init__(self, provider: str = "local", model_size: str = "small"):

        if provider == "local":
            self.engine = LocalWhisperSTT(model_size=model_size)

        elif provider == "api":
            self.engine = APIWhisperSTT()

        else:
            raise ValueError(f"Unsupported STT provider: {provider}")

    def transcribe(self, audio_path: str) -> str:
        return self.engine.transcribe(audio_path)