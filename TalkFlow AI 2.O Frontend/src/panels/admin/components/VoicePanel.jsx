import { useState, useRef } from "react";
import { Mic } from "lucide-react";
import { sendVoiceToAI } from "../hooks/ai";


export default function VoicePanel({ ai }) {
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunks = useRef([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    const recorder = new MediaRecorder(stream);
    mediaRecorderRef.current = recorder;

    recorder.ondataavailable = (e) => {
      chunks.current.push(e.data);
    };

    recorder.onstop = async () => {
      const blob = new Blob(chunks.current, { type: "audio/webm" });
      chunks.current = [];

      const token = localStorage.getItem("token");

      ai.setLoading(true);

      const res = await sendVoiceToAI(blob, token);

      ai.setMessages((prev) => [
        ...prev,
        { role: "user", text: res.transcription },
        { role: "ai", text: res.response_text },
      ]);

      ai.setAnalysis({
        intent: "voice_query",
        confidence: 95,
        response: res.response_text,
      });

      ai.setLoading(false);
    };

    recorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">

      <button
        onClick={recording ? stopRecording : startRecording}
        className={`w-20 h-20 rounded-full text-white ${
          recording ? "bg-red-500" : "bg-blue-600"
        }`}
      >
        <Mic size={28} />
      </button>

      <p className="mt-4">
        {recording ? "Listening..." : "Tap to speak"}
      </p>
    </div>
  );
}