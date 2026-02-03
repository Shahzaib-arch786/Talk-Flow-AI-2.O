import { Brain } from "lucide-react";
import useAICall from "../hooks/useAICall";

export default function NLPPanel() {
  const { intent, entity, category, score } = useAICall();

  return (
    <div className="bg-white border rounded-2xl p-5">
      <p className="text-blue-600 text-sm flex items-center gap-2">
        <Brain size={16} /> STEP 2: NATURAL LANGUAGE PROCESSING
      </p>

      <h3 className="font-bold text-lg mt-2">What I understood</h3>

      {/* SCORE */}
      <div className="flex justify-center mt-4">
        <div className="w-32 h-32 rounded-full border-4 border-blue-600 flex flex-col items-center justify-center">
          <p className="text-2xl font-bold">{score}%</p>
          <p className="text-xs text-gray-500">CERTAINTY SCORE</p>
        </div>
      </div>

      {/* INTENT */}
      <div className="bg-blue-50 p-3 rounded-xl mt-4">
        <p className="text-xs text-blue-600">DETECTED INTENT</p>
        <p className="font-semibold">{intent}</p>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-3">
        <div className="bg-gray-100 p-2 rounded">
          <p className="text-xs">ENTITY: TIME</p>
          <p className="text-sm">{entity}</p>
        </div>

        <div className="bg-gray-100 p-2 rounded">
          <p className="text-xs">CATEGORY</p>
          <p className="text-sm">{category}</p>
        </div>
      </div>
    </div>
  );
}