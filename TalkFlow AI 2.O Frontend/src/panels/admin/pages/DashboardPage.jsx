import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatCard from "../components/StatCard";
import IntentsCard from "../components/IntentsCard";
import RecentCallsTable from "../components/RecentCallsTable";
import { motion } from "framer-motion";
import { useDashboard } from "../hooks/useDashboard";
import { useState } from "react";
import { useEffect } from "react";
import { isAuthenticated } from "../../../utils/auth";

export default function DashboardPage() {
  const { stats, intents, calls } = useDashboard();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          window.location.href = "/login";
          return;
        }

        const response = await fetch("http://127.0.0.1:8000/auth/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          localStorage.removeItem("token");
          window.location.href = "/login";
          return;
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }

    fetchUser();
  }, []);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />

        <div className="p-6 space-y-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="text-2xl font-bold">Executive Overview</h1>
            <p className="text-gray-500">
              Track and optimize your AI communication performance.
            </p>
          </motion.div>

          {/* STATS */}
          <div className="grid md:grid-cols-4 gap-4">
            {stats.map((s) => (
              <StatCard key={s.title} {...s} />
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <IntentsCard data={intents} />
            <RecentCallsTable data={calls} />
          </div>
        </div>
      </div>
    </div>
  );
}