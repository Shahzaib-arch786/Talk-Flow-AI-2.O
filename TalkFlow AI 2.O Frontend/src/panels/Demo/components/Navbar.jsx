import { motion } from "framer-motion";
import { Codesandbox, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";


export default function Navbar() {

  const navigate = useNavigate();

  const handlleClick = () => {
    navigate("#get-started");
  }
  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <Codesandbox className="text-blue-600" />
          <span className="font-bold text-2xl">TalkFlow AI</span>
        </motion.div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="hover:text-blue-600 cursor-pointer font-bold">Features</a>
          <a href="#pipeline" className="hover:text-blue-600 cursor-pointer font-bold">Pipeline</a>
          <a href="#about" className="hover:text-blue-600 cursor-pointer font-bold">About</a>
          <button className="bg-blue-700 text-white px-5 py-2 rounded-md hover:bg-blue-600 cursor-pointer" onClick={handlleClick}>
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}