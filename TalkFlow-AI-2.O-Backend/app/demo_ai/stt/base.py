from abc import ABC, abstractmethod


class BaseSTT(ABC):
    """
    Abstract base class for all STT providers.
    """

    @abstractmethod
    def transcribe(self, audio_path: str) -> str:
        """
        Convert speech audio file into text.
        """
        pass