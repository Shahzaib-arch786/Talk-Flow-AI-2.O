export default function ConfidenceSlider() {
  return (
    <div className="bg-white border border-gray-300 shadow-sm rounded-lg p-6 space-y-4">
      <div>
        <h3 className="font-semibold">AI Confidence Threshold</h3>
        <p className="text-sm text-gray-500">
          Adjust how strict the AI should be when matching user queries.
        </p>
      </div>

      <div className="flex justify-between text-xs text-gray-500">
        <span>FLEXIBLE</span>
        <span>STRICT</span>
      </div>

      <div>
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium">Confidence Level</span>
          <span className="text-sm font-semibold text-blue-600">85%</span>
        </div>
        <input
          type="range"
          className="w-full accent-blue-600"
          defaultValue={85}
        />
      </div>
    </div>
  );
}
