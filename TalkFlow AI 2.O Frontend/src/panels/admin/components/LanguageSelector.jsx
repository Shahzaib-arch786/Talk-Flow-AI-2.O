export default function LanguageSelector() {
  return (
    <div className="bg-white border border-gray-300 shadow-sm rounded-lg p-6 space-y-4">
      <div>
        <h3 className="font-semibold">Default Language</h3>
        <p className="text-sm text-gray-500">
          Choose the primary language for AI interaction.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <LanguageCard
          title="English"
          subtitle="Global Standard"
          active
        />
        <LanguageCard
          title="Urdu (اردو)"
          subtitle="Local Dialect"
        />
      </div>
    </div>
  );
}

function LanguageCard({ title, subtitle, active }) {
  return (
    <div
      className={`p-4 border border-gray-300 rounded-lg cursor-pointer ${
        active
          ? "border-blue-600 bg-blue-50"
          : "hover:bg-gray-50"
      }`}
    >
      <div className="flex justify-between items-center">
        <div>
          <h4 className="font-medium">{title}</h4>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
        {active && (
          <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">
            ✓
          </div>
        )}
      </div>
    </div>
  );
}
