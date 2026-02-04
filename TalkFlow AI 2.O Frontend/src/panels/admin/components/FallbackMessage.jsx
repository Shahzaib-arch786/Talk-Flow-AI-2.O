export default function FallbackMessage() {
  return (
    <div className="bg-white border border-gray-300 shadow-sm rounded-lg p-6 space-y-4">
      <div>
        <h3 className="font-semibold">Fallback Message</h3>
        <p className="text-sm text-gray-500">
          Message shown when the AI doesn't understand the user query.
        </p>
      </div>

      <textarea
        rows={4}
        placeholder="e.g., I'm sorry, I didn't quite catch that. Would you like to speak with a human agent?"
        className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <p className="text-xs text-gray-400">
        Keep it friendly and offer helpful next steps.
      </p>
    </div>
  );
}
