export default function ToggleRow() {
  return (
    <div className="bg-white border border-gray-300 shadow-sm rounded-lg p-6 flex items-center justify-between">
      <div>
        <h3 className="font-semibold">Voice Response</h3>
        <p className="text-sm text-gray-500">
          Enable Text-to-Speech output for automated voice calls.
        </p>
      </div>

      <input type="checkbox" defaultChecked className="toggle" />
    </div>
  );
}
