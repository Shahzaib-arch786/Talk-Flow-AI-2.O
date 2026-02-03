import { MessageSquare, Headphones, Settings } from "lucide-react";
import { motion } from "framer-motion";

export default function CallNavbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border-b"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LEFT LOGO */}
        <div className="flex items-center gap-2">
          <MessageSquare className="text-blue-600" />
          <span className="font-semibold">TalkFlow AI</span>
        </div>

        {/* CENTER STATUS */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Headphones size={16} className="text-green-600" />
          <span>AI Call Demo</span>
        </div>

        {/* RIGHT ACTION */}
        <div>
          <button className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 transition px-3 py-2 rounded-xl text-blue-700 text-sm">
            <Settings size={16} />
            Settings
          </button>
        </div>

      </div>
    </motion.nav>
  );
}