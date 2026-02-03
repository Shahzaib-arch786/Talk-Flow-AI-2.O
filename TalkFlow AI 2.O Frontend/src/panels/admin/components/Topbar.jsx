import { Bell, Search } from "lucide-react";

export default function Topbar() {
  return (
    <div className="bg-white border-b p-4 flex justify-between items-center">
      <div className="flex items-center bg-gray-100 px-3 py-2 rounded-xl w-96">
        <Search size={16} className="text-gray-400" />
        <input
          className="bg-transparent outline-none ml-2 w-full"
          placeholder="Search analytics or calls..."
        />
      </div>

      <div className="flex items-center gap-4">
        <Bell className="text-gray-600" />

        <div className="flex items-center gap-2">
          <img
            className="w-8 h-8 rounded-full"
            src="https://i.pravatar.cc/100"
          />
          <div>
            <p className="text-sm font-semibold">Sarah Jenkins</p>
            <p className="text-xs text-gray-500">System Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}