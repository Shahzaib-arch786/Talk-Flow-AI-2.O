import { Clock } from "lucide-react";

export default function StatusCards({ status, lastUpdated }) {
  return (
    <div className="grid sm:grid-cols-2 gap-4 mb-8">
      
      <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
        <p className="text-xs text-gray-500 flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full" />
          CURRENT MODEL STATUS
        </p>
        <h3 className="text-xl font-bold mt-2">{status}</h3>
      </div>

      <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
        <p className="text-xs text-gray-500 flex items-center gap-2">
          <Clock size={14} />
          LAST UPDATED
        </p>
        <h3 className="text-xl font-bold mt-2">
          {lastUpdated}
        </h3>
      </div>

    </div>
  );
}
