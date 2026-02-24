from app.demo_ai.stt.base import BaseSTT


class APIWhisperSTT(BaseSTT):
    """
    Placeholder for API-based Whisper.
    """

    def __init__(self):
        raise NotImplementedError("API Whisper not implemented yet.")

    def transcribe(self, audio_path: str) -> str:
        raise NotImplementedError("API Whisper not implemented yet.")