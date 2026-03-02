from abc import ABC, abstractmethod


class BaseTTS(ABC):

    @abstractmethod
    def generate_audio(self, text: str) -> str:
        """
        Should return audio file URL or path.
        """
        pass