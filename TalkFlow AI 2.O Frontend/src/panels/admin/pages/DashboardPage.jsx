import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatCard from "../components/StatCard";
import IntentsCard from "../components/IntentsCard";
import RecentCallsTable from "../components/RecentCallsTable";
import { motion } from "framer-motion";
import { useDashboard } from "../hooks/useDashboard";

export default function DashboardPage() {
  const { stats, intents, calls } = useDashboard();

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Topbar />

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