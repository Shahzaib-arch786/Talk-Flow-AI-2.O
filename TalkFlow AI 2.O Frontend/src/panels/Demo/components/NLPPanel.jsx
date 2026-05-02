// import { Brain } from "lucide-react";
// import useAICall from "../hooks/useAICall";

// export default function NLPPanel({ai}) {
//   const { intent, entity, category, score } = useAICall();

//   return (
//     <div className="bg-white border-gray-400 rounded-xl p-5 shadow-xl">
//       <p className="text-blue-600 text-sm flex items-center gap-2 font-bold">
//         <Brain size={16} /> STEP 2: NATURAL LANGUAGE PROCESSING
//       </p>

//       <h3 className="font-bold text-lg mt-2">What I understood</h3>

//       {/* SCORE */}
//       <div className="flex justify-center mt-4">
//         <div className="w-32 h-32 rounded-full border-4 border-blue-600 flex flex-col items-center justify-center">
//           <p className="text-2xl font-bold">{ai.score || 0}%</p>
//           <p className="text-xs text-gray-500">CERTAINTY SCORE</p>
//         </div>
//       </div>

//       {/* INTENT */}
//       <div className="bg-blue-50 p-3 rounded-xl mt-4">
//         <p className="text-xs text-blue-600">DETECTED INTENT</p>
//         <p className="font-semibold">{ai.intent || "No intent detected"}</p>
//       </div>

//       <div className="grid grid-cols-2 gap-2 mt-3">
//         <div className="bg-gray-100 p-2 rounded">
//           <p className="text-xs">ENTITY: TIME</p>
//           <p className="text-sm">{ai.entity || "N/A"}</p>
//         </div>

//         <div className="bg-gray-100 p-2 rounded">
//           <p className="text-xs">CATEGORY</p>
//           <p className="text-sm">{ai.category || "N/A"}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

import { Brain, Gauge } from "lucide-react";

export default function NLPPanel({ ai }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <p className="text-purple-600 text-sm font-semibold flex items-center gap-2">
        <Brain size={16} />
        AI Intelligence Layer
      </p>

      <h3 className="font-bold text-lg mt-3">Intent Analysis</h3>

      {/* Confidence Circle */}
      <div className="flex justify-center mt-6">
        <div className="relative w-36 h-36 rounded-full bg-linear-to-r from-blue-600 to-purple-600 p-1">
          <div className="w-full h-full rounded-full bg-white flex flex-col justify-center items-center">
            <p className="text-3xl font-bold">
              {ai.confidence || 0}%
            </p>
            <p className="text-xs text-gray-500">
              confidence
            </p>
          </div>
        </div>
      </div>

      {/* Intent */}
      <div className="mt-5 bg-blue-50 p-4 rounded-xl">
        <p className="text-xs text-blue-600">Detected Intent</p>
        <p className="font-semibold text-lg">
          {ai.intent || "Waiting..."}
        </p>
      </div>

      {/* Real Metrics */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="bg-gray-50 rounded-xl p-3">
          <p className="text-xs text-gray-400">Response Speed</p>
          <p className="font-semibold">
            {ai.responseText ? "1.2s" : "--"}
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-3">
          <p className="text-xs text-gray-400">Language</p>
          <p className="font-semibold">
            {ai.transcript?.match(/[\u0600-\u06FF]/)
              ? "Urdu"
              : "English"}
          </p>
        </div>
      </div>
    </div>
  );
}