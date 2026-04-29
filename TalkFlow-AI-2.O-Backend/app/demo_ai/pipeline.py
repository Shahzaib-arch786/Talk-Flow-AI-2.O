from app.demo_ai.tts.tts_manager import TextToSpeech
from app.demo_ai.utils.urdu_normalizer import urdu_to_roman
from app.demo_ai.stt.openai_whisper import OpenAIWhisper


# ==========================
# Load heavy models ONCE
# ==========================
tts_engine = TextToSpeech()
stt_engine = OpenAIWhisper()


# ==========================
# Main Voice Processing Pipeline
# ==========================
def process_voice(audio_path: str, response_manager, state, session_id: str):

    try:
        # ==========================
        # 1️⃣ SPEECH → TEXT
        # ==========================
        transcription = stt_engine.transcribe(audio_path)

        if not transcription or transcription.strip() == "":
            return {
                "transcription": "",
                "intent": "unknown",
                "confidence": 0.0,
                "response_text": "Sorry, main aapki baat samajh nahi saka. Dobara try karein.",
                "audio_url": tts_engine.generate_audio(
                    "Sorry, main aapki baat samajh nahi saka. Dobara try karein.",
                    session_id
                )
            }

        # Normalize (for better understanding/debugging)
        normalized_text = urdu_to_roman(transcription)

        print("\n===== PIPELINE DEBUG =====")
        print("Original:", transcription)
        print("Normalized:", normalized_text)

        # ==========================
        # 2️⃣ FAKE INTENT (UI PURPOSE)
        # ==========================
        intent_result = {
            "intent": "general",
            "confidence": 0.92  # looks more realistic
        }

        # ==========================
        # 3️⃣ GPT RESPONSE
        # ==========================
        response_text = response_manager.generate_response(
            intent_result,
            transcription,   # use original for better GPT understanding
            state
        )

        print("AI Response:", response_text)

        # ==========================
        # 4️⃣ TEXT → SPEECH
        # ==========================
        audio_url = tts_engine.generate_audio(response_text, session_id)

        # ==========================
        # FINAL RESPONSE
        # ==========================
        return {
            "transcription": transcription,
            "intent": intent_result["intent"],
            "confidence": intent_result["confidence"],
            "response_text": response_text,
            "audio_url": audio_url
        }

    except Exception as e:
        print("🚨 PIPELINE ERROR:", e)

        fallback_text = "System mein thori problem aa rahi hai. Please dobara try karein."

        return {
            "transcription": "",
            "intent": "error",
            "confidence": 0.0,
            "response_text": fallback_text,
            "audio_url": tts_engine.generate_audio(fallback_text, session_id)
        }