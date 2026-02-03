import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <MessageSquare className="text-blue-600" />
          <span className="font-semibold text-lg">TalkFlow AI</span>
        </motion.div>

        <div className="hidden md:flex items-center gap-8">
          <a className="hover:text-blue-600 cursor-pointer">Features</a>
          <a className="hover:text-blue-600 cursor-pointer">Pipeline</a>
          <a className="hover:text-blue-600 cursor-pointer">About</a>

          <button className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}