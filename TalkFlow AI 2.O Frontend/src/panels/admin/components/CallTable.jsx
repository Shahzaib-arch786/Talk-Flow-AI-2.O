import StatusBadge from "./StatusBadge";

export default function CallTable({ logs, loading }) {
  if (loading) return <p>Loading...</p>;

  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-sm overflow-x-auto">
      <table className="min-w-4xl w-full text-sm">
        <thead className="bg-gray-50 text-gray-500">
          <tr>
            <th className="p-4 text-left">CALL ID</th>
            <th className="p-4 text-left">TRANSCRIPT PREVIEW</th>
            <th className="p-4 text-left">DETECTED INTENT</th>
            <th className="p-4 text-left">CONFIDENCE</th>
            <th className="p-4 text-left">AI RESPONSE</th>
            <th className="p-4 text-left">STATUS</th>
          </tr>
        </thead>

        <tbody>
          {logs?.map((r, index) => (
            <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
              <td className="p-4 text-blue-600 font-medium">{r.id}</td>

              <td className="p-4 text-gray-700">
                {r.transcript?.slice(0, 40)}...
              </td>

              <td className="p-4">
                <IntentPill label={r.intent} />
              </td>

              <td className="p-4">
                <ConfidenceBar value={r.confidence} />
              </td>

              <td className="p-4">
                {r.response?.slice(0, 30)}...
              </td>

              <td className="p-4">
                <StatusBadge status={r.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function IntentPill({ label }) {
  const colors = {
    greeting: "bg-green-100 text-green-700",
    pricing: "bg-indigo-100 text-indigo-700",
    order: "bg-pink-100 text-pink-700",
  };

  return (
    <span className={`px-3 py-1 rounded-lg text-xs ${colors[label] || "bg-gray-100 text-gray-700"}`}>
      {label}
    </span>
  );
}

function ConfidenceBar({ value }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-2 w-24 bg-gray-200 rounded">
        <div
          className="h-2 bg-blue-600 rounded"
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="font-medium">{value}%</span>
    </div>
  );
}