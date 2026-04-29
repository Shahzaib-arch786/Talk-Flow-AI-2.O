import { useState, useRef } from "react";

export default function useAICall() {
  const [isListening, setIsListening] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const [transcript, setTranscript] = useState("");
  const [intent, setIntent] = useState("");
  const [confidence, setConfidence] = useState(0);
  const [responseText, setResponseText] = useState("");
  const [audioUrl, setAudioUrl] = useState("");

  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const audioRef = useRef(null);

  const sessionId = localStorage.getItem("demo_session_id");

  // 🎙 Start recording
  const startRecording = async () => {
    if (isSpeaking || isThinking) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      let audioChunks = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
        audioChunks = [];

        setIsThinking(true);
        await sendToBackend(audioBlob);
        setIsThinking(false);
      };

      mediaRecorder.start();

      // record for 4 seconds per chunk
      setTimeout(() => {
        if (mediaRecorder.state !== "inactive") {
          mediaRecorder.stop();
        }
      }, 4900); // stop slightly before 5s to avoid cutting off the end
    } catch (error) {
      console.error("Microphone error:", error);
      stopAll();
    }
  };

  // 📤 Send to backend
  const sendToBackend = async (audioBlob) => {
    try {
      const formData = new FormData();
      formData.append("session_id", sessionId);
      formData.append("file", audioBlob, "audio.webm");

      const response = await fetch("http://127.0.0.1:8000/ai/voice", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Backend error");
      }

      const data = await response.json();
      console.log("API DATA:", data); // 🔥 ADD THIS

      if (data.transcription) setTranscript(data.transcription);

      if (data.intent) setIntent(data.intent);
      if (data.confidence !== undefined) {
        setConfidence(Math.round(data.confidence * 100));
      }
      if (data.response_text) {
        setResponseText(data.response_text);
      }
      if (data.audio_url) {
        setAudioUrl(data.audio_url);
      }

      if (data.remaining_seconds <= 0) {
        stopAll();
        return;
      }

      if (data.audio_url) {
        playAudio(data.audio_url);
      }
    } catch (error) {
      console.error("AI call error:", error);
      stopAll();
    }
  };

  // 🔊 Play AI response
  const playAudio = (audioUrl) => {
    const fullUrl = `http://127.0.0.1:8000${audioUrl}`;

    const audio = new Audio(fullUrl);
    audioRef.current = audio;

    setIsSpeaking(true);

    audio.play();

    audio.onended = () => {
      setIsSpeaking(false);

      // 🔥 AUTO LOOP (KEY FEATURE)
      if (isListening) {
        setTimeout(() => {
          startRecording();
        }, 500); // slight delay = natural feel
      }
    };
  };

  // ⏹ Stop everything
  const stopAll = () => {
    setIsListening(false);
    setIsThinking(false);
    setIsSpeaking(false);

    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }

    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  // 🔁 Toggle listening
  const toggleListening = () => {
    if (!isListening) {
      setIsListening(true);
      startRecording();
    } else {
      stopAll();
    }
  };

  return {
    isListening,
    isThinking,
    isSpeaking,
    toggleListening,
    transcript,
    intent,
    confidence,
    responseText,
    audioUrl,
  };
}
