import { Mic } from "lucide-react";
import useAICall from "../hooks/useAICall";

export default function STTPanel() {
  const { transcript } = useAICall();

  return (
    <div className="bg-white border rounded-2xl p-5">
      <p className="text-blue-600 text-sm flex items-center gap-2">
        <Mic size={16} /> STEP 1: SPEECH-TO-TEXT
      </p>

      <h3 className="font-bold text-lg mt-2">What I heard</h3>

      <div className="bg-gray-100 h-20 rounded-xl mt-3 flex items-center justify-center">
        {/* fake waveform */}
        <div className="flex gap-1">
          {[1,2,3,4,5,6,7,8].map(i => (
            <div key={i} className="w-1 bg-blue-600 h-6 rounded"></div>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <p className="text-xs text-green-600">● LIVE TRANSCRIPTION</p>

        <p className="italic text-gray-600 mt-2">
          "{transcript}"
        </p>
      </div>
    </div>
  );
}