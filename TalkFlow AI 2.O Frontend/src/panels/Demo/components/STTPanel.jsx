// import { Mic } from "lucide-react";
// import useAICall from "../hooks/useAICall";

// export default function STTPanel({ai}) {
//   const { transcript } = useAICall();

//   return (
//     <div className="bg-white border-gray-500 rounded-xl p-5 shadow-xl">
//       <p className="text-blue-600 text-sm flex items-center gap-2 font-bold">
//         <Mic size={16} /> STEP 1: SPEECH-TO-TEXT
//       </p>

//       <h3 className="font-bold text-lg mt-2">What I heard</h3>

//       <div className="bg-gray-100 h-20 rounded-xl mt-3 flex items-center justify-center">
//         {/* fake waveform */}
//         <div className="flex gap-1">
//           {[1,2,3,4,5,6,7,8].map(i => (
//             <div key={i} className="w-1 bg-blue-600 h-6 rounded"></div>
//           ))}
//         </div>
//       </div>

//       <div className="mt-4">
//         <p className="text-xs text-green-600">● LIVE TRANSCRIPTION</p>

//         <p className="italic text-gray-600 mt-2">
//           "{ai.transcript || '...'}"
//         </p>
//       </div>
//     </div>
//   );
// }

import { Mic } from "lucide-react";
import { motion } from "framer-motion";

export default function STTPanel({ ai }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <p className="text-blue-600 text-sm font-semibold flex gap-2 items-center">
        <Mic size={16} />
        Speech Recognition
      </p>

      <h3 className="font-bold text-lg mt-3">Live Transcript</h3>

      <div className="mt-5 bg-gray-50 rounded-xl p-5 min-h-35">
        <motion.div
          animate={
            ai.isListening
              ? {
                  opacity: [0.4, 1, 0.4],
                }
              : {}
          }
          transition={{
            repeat: Infinity,
            duration: 1,
          }}
          className="flex gap-1 mb-4"
        >
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="w-1 bg-blue-600 rounded-full"
              style={{
                height: `${Math.random() * 40 + 10}px`,
              }}
            />
          ))}
        </motion.div>

        <p className="text-gray-700 italic">
          {ai.transcript || "Waiting for user voice input..."}
        </p>
      </div>
    </div>
  );
}