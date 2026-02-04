import { Bell, Search, User } from "lucide-react";
import UserMenu from "./UserMenu";

export default function Topbar() {
  return (
    <div className="bg-white border-b-gray-400 p-4 flex justify-between items-center">
      <div className="flex items-center bg-gray-100 px-3 py-2 rounded-xl w-96">
        <Search size={16} className="text-gray-400" />
        <input
          className="bg-transparent outline-none ml-2 w-full"
          placeholder="Search analytics or calls..."
        />
      </div>

      <div className="flex items-center gap-4">

        <div className="flex items-center gap-2">
          <UserMenu />
        </div>
      </div>
    </div>
  );
}