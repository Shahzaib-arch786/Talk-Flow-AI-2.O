import { MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

export default function TryNavbar() {
  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2"
        >
          <MessageSquare className="text-blue-600" />
          <span className="font-semibold">TalkFlow AI</span>
        </motion.div>

        <button className="bg-blue-600 text-white px-5 py-2 rounded-xl">
          Go to Website
        </button>

      </div>
    </nav>
  );
}