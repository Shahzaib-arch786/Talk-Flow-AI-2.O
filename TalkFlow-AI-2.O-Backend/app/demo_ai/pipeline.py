from app.demo_ai.intent.predict import IntentClassifier
from app.demo_ai.tts.tts_manager import TextToSpeech
from app.demo_ai.utils.urdu_normalizer import urdu_to_roman
from app.demo_ai.stt.openai_whisper import OpenAIWhisper


# 🔥 Load heavy models ONCE
intent_model = IntentClassifier()
tts_engine = TextToSpeech()
stt_engine = OpenAIWhisper()  # ← LOADED ONLY ONCE


def process_voice(audio_path: str, response_manager, state, session_id: str):

    # 1️⃣ STT
    transcription = stt_engine.transcribe(audio_path)
    normalized_text = urdu_to_roman(transcription)
    print("[DEBUG] Normalized Text:", normalized_text)

    # 2️⃣ Intent
    intent_result = intent_model.predict(normalized_text)

    # 3️⃣ Response
    response_text = response_manager.generate_response(
        intent_result,
        transcription,
        state
    )

    # 4️⃣ TTS
    audio_url = tts_engine.generate_audio(response_text, session_id)

    return {
        "transcription": transcription,
        "intent": intent_result.get("intent"),
        "confidence": intent_result.get("confidence"),
        "response_text": response_text,
        "audio_url": audio_url
    }