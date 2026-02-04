import { CheckCircle } from "lucide-react";

export default function RecentUploadsTable({ uploads }) {
  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
      
      <div className="p-5 border-b font-semibold">
        Recently Uploaded Files
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-4">File Name</th>
              <th className="p-4 hidden sm:table-cell">Upload Date</th>
              <th className="p-4 hidden md:table-cell">Size</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {uploads.map((f, i) => (
              <tr key={i} className="border-t">
                <td className="p-4 font-medium">{f.name}</td>
                <td className="p-4 hidden sm:table-cell">{f.date}</td>
                <td className="p-4 hidden md:table-cell">{f.size}</td>
                <td className="p-4">
                  <span className="inline-flex items-center gap-1 text-green-700 bg-green-100 px-3 py-1 rounded-full text-xs">
                    <CheckCircle size={14} />
                    {f.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 text-center">
        <button className="text-blue-700 font-semibold hover:underline">
          View All History
        </button>
      </div>

    </div>
  );
}
