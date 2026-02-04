import { LayoutDashboard, BarChart2, Mic, Settings, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";

export default function Sidebar({ open, onClose }) {
  const items = [
    { name: "Dashboard", icon: LayoutDashboard, active: true, path: "/admin/dashboard" },
    { name: "AI Knowledge", icon: BarChart2, path: "/admin/ai-knowledge" },
    { name: "Call Logs", icon: Mic, path: "/admin/call-logs" },
    { name: "Settings", icon: Settings, path: "/admin/settings" },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 bg-white border-r border-gray-200 shadow-sm p-4">
        <SidebarContent items={items} />
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />

            {/* Slide Panel */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 h-full w-64 bg-white border-r z-50 p-4"
            >
              <div className="flex justify-between items-center mb-6">
                <span className="font-bold">TalkFlow AI</span>
                <button onClick={onClose}>
                  <X />
                </button>
              </div>

              <SidebarContent items={items} onItemClick={onClose} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function SidebarContent({ items, onItemClick }) {
  return (
    <>
      <div className="flex items-center gap-2 mb-8">
        <div className="bg-blue-600 p-2 rounded-xl text-white">
          <LayoutDashboard />
        </div>
        <div>
          <h2 className="font-bold">TalkFlow AI</h2>
          <p className="text-xs text-gray-500">Business Admin</p>
        </div>
      </div>

      <nav className="space-y-2">
        {items.map((i) => (
          <NavLink
            key={i.name}
            to={i.path}
            onClick={() => onItemClick?.()}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-xl cursor-pointer transition ${
                isActive
                  ? "bg-blue-50 text-blue-700 font-bold"
                  : "hover:bg-gray-100 text-gray-700"
              }`
            }
          >
            <i.icon size={18} />
            <span className="text-sm">{i.name}</span>
          </NavLink>
        ))}
      </nav>
    </>
  );
}

