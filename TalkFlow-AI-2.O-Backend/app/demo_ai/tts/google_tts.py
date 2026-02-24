import os
import uuid
import pygame
from gtts import gTTS
from app.demo_ai.tts.base import BaseTTS


class GoogleTTS(BaseTTS):

    def __init__(self):
        pygame.mixer.init()

    def speak(self, text: str):

        filename = f"temp_{uuid.uuid4().hex}.mp3"

        tts = gTTS(text=text, lang="ur")
        tts.save(filename)

        pygame.mixer.music.load(filename)
        pygame.mixer.music.play()

        while pygame.mixer.music.get_busy():
            continue

        pygame.mixer.music.unload()
        os.remove(filename)