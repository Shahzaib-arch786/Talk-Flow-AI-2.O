import { motion, AnimatePresence } from "framer-motion";

export default function NotificationPanel({ open, notifications }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute right-0 mt-3 w-72 bg-white border rounded-xl shadow-lg z-50"
        >
          <div className="p-4 border-b font-semibold">
            Notifications
          </div>

          {notifications.length === 0 ? (
            <p className="p-4 text-sm text-gray-500">
              No new notifications
            </p>
          ) : (
            <ul className="max-h-60 overflow-auto">
              {notifications.map((n) => (
                <li
                  key={n.id}
                  className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                >
                  <p className="text-sm">{n.text}</p>
                  <span className="text-xs text-gray-400">{n.time}</span>
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
