import { useState } from "react";

export default function useAICall() {
  const [isListening, setIsListening] = useState(false);

  // demo states (later connect with real backend)
  const [transcript] = useState(
    "I'm looking to book a doctor's appointment for tomorrow morning around 9:00 AM."
  );

  const [intent] = useState("Medical Appointment");
  const [entity] = useState("Tomorrow 9 AM");
  const [category] = useState("Healthcare");
  const [score] = useState(97);

  const toggleListening = () => {
    setIsListening(!isListening);
  };

  return {
    isListening,
    toggleListening,
    transcript,
    intent,
    entity,
    category,
    score,
  };
}