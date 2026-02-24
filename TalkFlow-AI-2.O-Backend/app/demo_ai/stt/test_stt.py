from app.demo_ai.stt.stt_manager import SpeechToText


if __name__ == "__main__":

    stt = SpeechToText(provider="local", model_size="base")

    audio_path = input("Enter path to audio file (.wav/.mp3): ")

    try:
        text = stt.transcribe(audio_path)

        print("\n====== FINAL TRANSCRIPTION ======")
        print(text)
        print("=================================")

    except Exception as e:
        print("Error:", e)