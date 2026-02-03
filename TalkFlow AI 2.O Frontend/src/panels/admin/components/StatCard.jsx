import { motion } from "framer-motion";

export default function StatCard({ icon: Icon, title, value, tag }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white p-4 rounded-2xl border"
    >
      <div className="flex justify-between">
        <div className="p-2 bg-blue-50 rounded-lg">
          <Icon className="text-blue-600" />
        </div>

        <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded">
          {tag}
        </span>
      </div>

      <p className="text-gray-500 mt-3">{title}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
    </motion.div>
  );
}