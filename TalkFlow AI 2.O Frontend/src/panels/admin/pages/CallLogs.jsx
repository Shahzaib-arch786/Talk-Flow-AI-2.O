import AdminLayout from "../layout/AdminLayout";
import Filters from "../components/Filters";
import CallTable from "../components/CallTable";
import Pagination from "../components/Pagination";

export default function CallLogs() {
  return (
    <AdminLayout>
      <div className="space-y-8">

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Call History Logs</h1>
            <p className="text-gray-600 text-sm mt-1">
              Review and analyze AI-assisted call interactions, detected intents,
              and confidence levels.
            </p>
          </div>

          <button className="bg-blue-600 text-white px-5 py-2 rounded-lg w-fit hover:bg-blue-700">
            Export Logs
          </button>
        </div>

        {/* Filters */}
        <Filters />

        {/* Table */}
        <CallTable />

        {/* Pagination */}
        <Pagination />

      </div>
    </AdminLayout>
  );
}
