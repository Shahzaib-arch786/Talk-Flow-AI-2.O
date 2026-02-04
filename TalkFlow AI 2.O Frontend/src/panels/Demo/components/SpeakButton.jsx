import { Mic } from "lucide-react";
import { motion } from "framer-motion";
import useAICall from "../hooks/useAICall";

export default function SpeakButton() {
  const { isListening, toggleListening } = useAICall();

  return (
    <div className="flex flex-col items-center mt-8">
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={toggleListening}
        className="w-28 h-28 rounded-full bg-blue-700 text-white flex flex-col items-center justify-center shadow-xl p-6 cursor-pointer"
      >
        <Mic size={28} />
        <span className="text-xs mt-1">
          {isListening ? "LISTENING..." : "START SPEAKING"}
        </span>
      </motion.button>

      <p className="mt-3 text-sm flex items-center gap-2">
        <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
        AI Engine Ready
      </p>
    </div>
  );
}