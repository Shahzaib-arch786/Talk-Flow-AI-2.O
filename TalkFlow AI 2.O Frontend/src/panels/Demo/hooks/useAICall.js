import { useState, useRef } from "react";

export default function useAICall() {
  const [isListening, setIsListening] = useState(false);

  const [transcript, setTranscript] = useState("");
  const [intent, setIntent] = useState("");
  const [confidence, setConfidence] = useState(0);
  const [responseText, setResponseText] = useState("");

  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const audioRef = useRef(null);

  const sessionId = localStorage.getItem("demo_session_id");

  // 🎙 Start recording
  const startRecording = async () => {
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

        await sendToBackend(audioBlob);
      };

      mediaRecorder.start();

      // record for 4 seconds per chunk
      setTimeout(() => {
        if (mediaRecorder.state !== "inactive") {
          mediaRecorder.stop();
        }
      }, 4000);

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

      setTranscript(data.transcription);
      setIntent(data.intent);
      setConfidence(Math.round((data.confidence || 0) * 100));
      setResponseText(data.response_text);

      if (data.remaining_seconds <= 0) {
        stopAll();
        return;
      }

      playAudio(data.audio_url);

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

    audio.play();

    audio.onended = () => {
      if (isListening) {
        startRecording();
      }
    };
  };

  // ⏹ Stop everything
  const stopAll = () => {
    setIsListening(false);

    if (mediaRecorderRef.current &&
        mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
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
    toggleListening,
    transcript,
    intent,
    confidence,
    responseText,
  };
}