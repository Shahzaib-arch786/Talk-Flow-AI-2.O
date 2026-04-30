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
import CallTrendChart from "../components/CallTrendChart";
import IntentDonutChart from "../components/IntentDonutChart";

export default function DashboardPage() {
  const { stats, intents, calls, trendData, intentDistribution } =
    useDashboard();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const fetchAdmin = async () => {
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
        setAdmin(data);
      } catch (error) {
        console.error("Error fetching admin:", error);
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    };

    fetchAdmin();
  }, []);

  const fetchBusiness = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://127.0.0.1:8000/admin/business/1", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    setBusiness(data.business);
  };

  useEffect(() => {
    if (admin) {
      fetchBusiness();
    }
  }, [admin]);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />

        <div className="p-6 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="text-3xl font-bold">Analytics Overview</h1>
              <p className="text-gray-500 mt-1">
                Real-time performance metrics for your AI voice agents.
              </p>
            </motion.div>
            <div className="flex justify-end gap-3">
              <button className="px-4 py-2 border rounded-lg text-sm">
                Last 7 Days
              </button>

              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
                Export PDF
              </button>
            </div>
          </div>

          {/* STATS */}
          <div className="grid md:grid-cols-4 gap-4">
            {stats.map((s) => (
              <StatCard key={s.title} {...s} />
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <CallTrendChart data={trendData} />
            </div>

            <IntentDonutChart data={intentDistribution} />
          </div>

          {/* Table */}
          <RecentCallsTable data={calls} />
        </div>
      </div>
    </div>
  );
}
