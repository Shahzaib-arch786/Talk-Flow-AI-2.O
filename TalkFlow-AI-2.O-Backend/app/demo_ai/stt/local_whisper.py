import os
import whisper
from app.demo_ai.stt.base import BaseSTT


class LocalWhisperSTT(BaseSTT):
    """
    Local Whisper implementation (offline).
    """

    def __init__(self, model_size: str = "base"):
        """
        model_size options:
        tiny, base, small, medium, large
        """
        print("[STT] Loading local Whisper model...")
        self.model = whisper.load_model(model_size)
        print("[STT] Whisper model loaded.")

    def transcribe(self, audio_path: str) -> str:
        if not os.path.exists(audio_path):
            raise FileNotFoundError(f"Audio file not found: {audio_path}")

        print(f"[STT] Transcribing file: {audio_path}")

        result = self.model.transcribe(
            audio_path,
            language="urdu",
            task="transcribe",
            )

        text = result.get("text", "").strip()

        print(f"[STT] Transcription complete: {text}")

        return text