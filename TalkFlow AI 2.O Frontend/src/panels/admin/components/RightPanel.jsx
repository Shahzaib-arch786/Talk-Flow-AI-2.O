export default function RightPanel({ analysis }) {
  return (
    <div className="space-y-4">

      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="text-sm text-gray-400">Detected Intent</h3>
        <p className="text-blue-600 font-semibold">
          {analysis.intent || "—"}
        </p>

        <div className="mt-3">
          <div className="h-2 bg-gray-200 rounded">
            <div
              className="h-2 bg-blue-600 rounded"
              style={{ width: `${analysis.confidence}%` }}
            />
          </div>
          <p className="text-xs mt-1">
            {analysis.confidence}% confidence
          </p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="text-sm text-gray-400">Response</h3>
        <p className="text-sm mt-2">
          {analysis.response || "Waiting..."}
        </p>
      </div>

    </div>
  );
}