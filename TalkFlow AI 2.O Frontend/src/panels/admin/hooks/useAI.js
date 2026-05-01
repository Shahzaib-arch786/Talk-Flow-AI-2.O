import { useState } from "react";

export const useAI = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // voice specific loading
  const [voiceLoading, setVoiceLoading] = useState(false);

  const [analysis, setAnalysis] = useState({
    intent: "",
    confidence: 0,
    response: "",
    mode: "",
    transcription: "",
    latency: "",
  });

  return {
    messages,
    setMessages,

    loading,
    setLoading,

    voiceLoading,
    setVoiceLoading,

    analysis,
    setAnalysis,
  };
};