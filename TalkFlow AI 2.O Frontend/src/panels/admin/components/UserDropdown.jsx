import { LogOut, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../utils/auth";

export default function UserDropdown({ open, onClose }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 🔌 backend logout later
    logout();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="absolute right-0 mt-3 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
        >
          <button
            onClick={() => navigate("/admin/profile")}
            className="flex items-center gap-2 w-full px-4 py-3 hover:bg-gray-100"
          >
            <User size={18} />
            Profile
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-4 py-3 text-red-600 hover:bg-gray-100"
          >
            <LogOut size={18} />
            Logout
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
