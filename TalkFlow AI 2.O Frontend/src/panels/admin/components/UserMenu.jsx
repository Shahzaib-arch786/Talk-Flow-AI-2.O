import { Bell } from "lucide-react";
import { useState, useRef } from "react";
import useAuthUser from "../hooks/useAuthUser";
import useNotifications from "../hooks/useNotifications";
import UserDropdown from "./UserDropdown";
import NotificationPanel from "./NotificationPanel";

export default function UserMenu() {
  const { user, loading } = useAuthUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const {
    notifications,
    open: notifOpen,
    toggle: toggleNotif,
  } = useNotifications();

  if (loading) return null;

  return (
    <div className="relative flex items-center gap-4">
      {/* Notifications */}
      <div className="relative">
        <button onClick={toggleNotif} className="relative">
          <Bell className="text-gray-600 hover:text-blue-600" />
          {notifications.length > 0 && (
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
          )}
        </button>

        <NotificationPanel
          open={notifOpen}
          notifications={notifications}
        />
      </div>

      {/* User */}
      <div className="relative">
        <div
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img
            src={user.avatar}
            className="w-8 h-8 rounded-full"
            alt={user.name}
          />
          <div>
            <p className="text-sm font-semibold">{user.name}</p>
            <p className="text-xs text-gray-500">{user.role}</p>
          </div>
        </div>

        <UserDropdown
          open={dropdownOpen}
          onClose={() => setDropdownOpen(false)}
        />
      </div>
    </div>
  );
}
