import StatusBadge from "./StatusBadge";

const rows = [
  {
    id: "#TF-9021",
    transcript: "I need to book a flight to London fo...",
    intent: "Booking",
    confidence: 92,
    response: "Confirmed...",
    status: "success",
  },
  {
    id: "#TF-8842",
    transcript: "What is your refund policy for prem...",
    intent: "Inquiry",
    confidence: 88,
    response: "Provided...",
    status: "success",
  },
  {
    id: "#TF-8710",
    transcript: "The app is crashing on login when I...",
    intent: "Support",
    confidence: 95,
    response: "Escalated...",
    status: "completed",
  },
  {
    id: "#TF-8655",
    transcript: "Mujhe naya account banana hai au...",
    intent: "Registration",
    confidence: 84,
    response: "Guided...",
    status: "success",
  },
];

export default function CallTable() {
  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-sm overflow-x-auto">
      <table className="min-w-4xl w-full text-sm">
        <thead className="bg-gray-50 text-gray-500">
          <tr className="">
            <th className="p-4 text-left">CALL ID</th>
            <th className="p-4 text-left">TRANSCRIPT PREVIEW</th>
            <th className="p-4 text-left">DETECTED INTENT</th>
            <th className="p-4 text-left">CONFIDENCE</th>
            <th className="p-4 text-left">AI RESPONSE</th>
            <th className="p-4 text-left">STATUS</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-t border-gray-200 shadow-sm hover:bg-gray-50 pointer p-10">
              <td className="p-4 text-blue-600 font-medium">{r.id}</td>
              <td className="p-4 text-gray-700">{r.transcript}</td>
              <td className="p-4">
                <IntentPill label={r.intent} />
              </td>
              <td className="p-4">
                <ConfidenceBar value={r.confidence} />
              </td>
              <td className="p-4">{r.response}</td>
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
    Booking: "bg-blue-100 text-blue-700",
    Inquiry: "bg-purple-100 text-purple-700",
    Support: "bg-yellow-100 text-yellow-700",
    Registration: "bg-red-100 text-red-700",
  };

  return (
    <span className={`px-3 py-1 rounded-lg text-xs ${colors[label]}`}>
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

