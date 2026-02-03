export default function RecentCallsTable({ data }) {
  return (
    <div className="bg-white p-4 rounded-2xl border">
      <div className="flex justify-between mb-4">
        <h3 className="font-semibold">Recent Call Activity</h3>
        <span className="text-blue-600 text-sm">View All</span>
      </div>

      <table className="w-full text-sm">
        <thead className="text-gray-400">
          <tr>
            <th className="text-left">Time</th>
            <th>Language</th>
            <th>Intent</th>
            <th>Confidence</th>
          </tr>
        </thead>

        <tbody>
          {data.map((c, i) => (
            <tr key={i} className="border-t hover:bg-gray-50">
              <td className="text-left">{c.time}</td>
              <td className="text-left">{c.lang}</td>
              <td>
                <span className="bg-transparent text-blue-700 px-3 py-1">
                  {c.intent}
                </span>
              </td>
              <td className="text-green-600">{c.confidence}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}