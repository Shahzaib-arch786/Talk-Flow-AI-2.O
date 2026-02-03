export default function IntentsCard({ data }) {
  return (
    <div className="bg-white p-4 rounded-2xl border">
      <h3 className="font-semibold mb-4">Top Detected Intents</h3>

      <div className="space-y-3">
        {data.map((i) => (
          <div key={i.name}>
            <div className="flex justify-between text-sm">
              <span>{i.name}</span>
              <span>{i.percent}%</span>
            </div>

            <div className="h-2 bg-gray-100 rounded">
              <div
                className="h-2 bg-blue-600 rounded"
                style={{ width: `${i.percent}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}