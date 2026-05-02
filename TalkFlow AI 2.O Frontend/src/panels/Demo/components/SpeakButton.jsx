// import { Mic } from "lucide-react";
// import { motion } from "framer-motion";
// import useAICall from "../hooks/useAICall";

// export default function SpeakButton({ai}) {
//   const { isListening, toggleListening } = useAICall();
//   if (!ai) return null;

//   return (
//     <div className="flex flex-col items-center mt-8">
//       <motion.button
//         whileTap={{ scale: 0.9 }}
//         onClick={toggleListening}
//         className="w-28 h-28 rounded-full bg-blue-700 text-white flex flex-col items-center justify-center shadow-xl p-6 cursor-pointer"
//       >
//         <Mic size={28} />
//         <span className="text-xs mt-1">
//           {isListening ? "LISTENING..." : "START SPEAKING"}
//         </span>
//       </motion.button>

//       <p className="mt-3 text-sm flex items-center gap-2">
//         <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
//         AI Engine Ready
//       </p>
//     </div>
//   );
// }

import { Mic, Square } from "lucide-react";
import { motion } from "framer-motion";

export default function SpeakButton({ ai }) {
  if (!ai) return null;

  return (
    <div className="flex flex-col items-center mt-10">
      <motion.button
        whileTap={{ scale: 0.95 }}
        animate={
          ai.isListening
            ? {
                boxShadow: [
                  "0px 0px 0px rgba(37,99,235,0.4)",
                  "0px 0px 40px rgba(37,99,235,0.8)",
                  "0px 0px 0px rgba(37,99,235,0.4)",
                ],
              }
            : {}
        }
        transition={{
          repeat: Infinity,
          duration: 1.5,
        }}
        onClick={ai.toggleListening}
        className={`w-32 h-32 rounded-full flex flex-col items-center justify-center text-white shadow-2xl ${
          ai.isListening
            ? "bg-red-500"
            : "bg-linear-to-r from-blue-600 to-indigo-600"
        }`}
      >
        {ai.isListening ? <Square size={28} /> : <Mic size={28} />}

        <span className="text-xs mt-2 font-medium">
          {ai.isListening ? "STOP" : "START"}
        </span>
      </motion.button>

      <p className="mt-4 text-sm text-gray-500">
        {ai.isThinking
          ? "AI is processing..."
          : ai.isSpeaking
          ? "AI is speaking..."
          : "Ready for conversation"}
      </p>
    </div>
  );
}