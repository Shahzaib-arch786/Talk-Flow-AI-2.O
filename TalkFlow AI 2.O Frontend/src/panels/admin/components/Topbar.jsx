import { Menu, Search } from "lucide-react";
import UserMenu from "./UserMenu";

export default function Topbar({ onMenuClick }) {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30">
      <div className="flex items-center justify-between px-4 py-2 md:py-4">

        {/* Left */}
        <div className="flex items-center gap-3">
          {/* Burger */}
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu size={22} />
          </button>

          {/* Search */}
          <div className="hidden sm:flex items-center bg-gray-100 px-3 py-2 rounded-xl w-64 md:w-96">
            <Search size={16} className="text-gray-400" />
            <input
              className="bg-transparent outline-none ml-2 w-full text-sm"
              placeholder="Search analytics or calls..."
            />
          </div>
        </div>

        {/* Right */}
        <UserMenu />
      </div>
    </header>
  );
}
