import { useState } from "react";

export const useAI = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const [analysis, setAnalysis] = useState({
    intent: "",
    confidence: 0,
    response: "",
  });

  return {
    messages,
    setMessages,
    loading,
    setLoading,
    analysis,
    setAnalysis,
  };
};