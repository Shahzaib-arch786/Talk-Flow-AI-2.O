import { Volume2, Play } from "lucide-react";

export default function TTSPanel() {
  return (
    <div className="bg-white border rounded-2xl p-5">
      <p className="text-blue-600 text-sm flex items-center gap-2">
        <Volume2 size={16} /> STEP 3: TEXT-TO-SPEECH
      </p>

      <h3 className="font-bold text-lg mt-2">How I responded</h3>

      <div className="bg-blue-700 text-white p-4 rounded-xl mt-3">
        "I've found an available slot for a general check-up tomorrow at 9:00 AM.
        Would you like me to confirm this booking for you?"
      </div>

      <p className="text-xs text-gray-400 mt-3">VOICE OUTPUT</p>

      <div className="flex items-center gap-3 bg-gray-100 p-3 rounded-xl mt-2">
        <button className="bg-blue-700 text-white p-2 rounded-full">
          <Play size={16} />
        </button>

        <div className="h-1 bg-blue-600 w-1/2 rounded"></div>
        <span className="text-xs">0:04</span>
      </div>
    </div>
  );
}