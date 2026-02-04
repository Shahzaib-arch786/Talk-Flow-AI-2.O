import { useEffect, useState } from "react";

export default function useNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // 🔌 Replace with backend API later
    const fetchNotifications = async () => {
      const data = [
        { id: 1, text: "New user signed up", time: "2 min ago" },
        { id: 2, text: "System update completed", time: "1 hour ago" },
      ];
      setNotifications(data);
    };

    fetchNotifications();
  }, []);

  return {
    notifications,
    open,
    toggle: () => setOpen(!open),
    close: () => setOpen(false),
  };
}
