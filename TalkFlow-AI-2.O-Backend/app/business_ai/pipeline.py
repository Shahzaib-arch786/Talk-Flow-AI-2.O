from app.demo_ai.tts.tts_manager import TextToSpeech
from app.demo_ai.stt.openai_whisper import OpenAIWhisper
from app.business_ai.response_manager import BusinessResponseManager

from app.admin.business_model import Business
from app.admin.business_service import get_business_data


tts_engine = TextToSpeech()
stt_engine = OpenAIWhisper()


def process_voice_business(
    audio_path,
    state,
    session_id,
    db,
    current_user
):

    try:
        # ==========================
        # 1️⃣ STT
        # ==========================
        transcription = stt_engine.transcribe(audio_path)

        if not transcription or transcription.strip() == "":
            fallback = "Sorry, I couldn't understand. Please try again."

            return {
                "transcription": "",
                "response_text": fallback,
                "audio_url": tts_engine.generate_audio(fallback, session_id)
            }

        print("User said:", transcription)

        # ==========================
        # 2️⃣ GET USER BUSINESS
        # ==========================
        business = db.query(Business).filter_by(
            user_id=current_user.id,
            is_active=True
        ).first()

        if not business:
            raise Exception("No business found for this user")

        # ==========================
        # 3️⃣ LOAD BUSINESS DATA
        # ==========================
        business_data = get_business_data(db, business.id)

        # ==========================
        # 4️⃣ GPT RESPONSE
        # ==========================
        response_manager = BusinessResponseManager()

        response_text = response_manager.generate_response(
            {"intent": "general", "confidence": 0.9},
            transcription,
            state,
            business_data
        )

        print("AI:", response_text)

        # ==========================
        # 5️⃣ TTS
        # ==========================
        audio_url = tts_engine.generate_audio(response_text, session_id)

        return {
            "transcription": transcription,
            "response_text": response_text,
            "audio_url": audio_url
        }

    except Exception as e:
        print("🚨 BUSINESS AI ERROR:", e)

        fallback = "System error. Please try again."

        return {
            "transcription": "",
            "response_text": fallback,
            "audio_url": tts_engine.generate_audio(fallback, session_id)
        }