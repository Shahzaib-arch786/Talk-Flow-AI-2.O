// import { Volume2, Play } from "lucide-react";

// export default function TTSPanel({ai}) {
//   return (
//     <div className="bg-white border-gray-400 rounded-xl p-5 shadow-xl">
//       <p className="text-blue-600 text-sm flex items-center gap-2 font-bold">
//         <Volume2 size={16} /> STEP 3: TEXT-TO-SPEECH
//       </p>

//       <h3 className="font-bold text-lg mt-2">How I responded</h3>

//       <div className="bg-blue-700 text-white p-4 rounded-xl mt-3">
//         "{ai.responseText || '...'}"
//       </div>

//       <p className="text-xs text-gray-400 mt-3">VOICE OUTPUT</p>

//       <div className="flex items-center gap-3 bg-gray-100 p-3 rounded-xl mt-2">
//         <button className="bg-blue-700 text-white p-2 rounded-full">
//           <Play size={16} />
//         </button>

//         <div className="h-1 bg-blue-600 w-1/2 rounded"></div>
//         <span className="text-xs">0:04</span>
//       </div>
//     </div>
//   );
// }


import { Volume2, Play } from "lucide-react";

export default function TTSPanel({ ai }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <p className="text-green-600 text-sm font-semibold flex gap-2 items-center">
        <Volume2 size={16} />
        Voice Synthesis
      </p>

      <h3 className="font-bold text-lg mt-3">
        AI Response
      </h3>

      <div className="mt-5 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-5 min-h-35">
        <p className="leading-relaxed">
          {ai.responseText || "Waiting for AI response..."}
        </p>
      </div>

      <div className="mt-4 flex justify-between text-sm text-gray-500">
        <span>Voice Engine</span>
        <span>ElevenLabs v2</span>
      </div>
    </div>
  );
}