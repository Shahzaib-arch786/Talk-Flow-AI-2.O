import { motion, AnimatePresence } from "framer-motion"
import { Codesandbox, Menu, X } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export default function Navbar() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const goTo = (path) => {
    setOpen(false)
    navigate(path)
  }

  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <Codesandbox className="text-blue-600" />
          <span className="font-bold text-2xl">TalkFlow AI</span>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="font-semibold hover:text-blue-600">Features</a>
          <a href="#pipeline" className="font-semibold hover:text-blue-600">Pipeline</a>
          <a href="#about" className="font-semibold hover:text-blue-600">About</a>

          <button
            onClick={() => navigate("/signup")}
            className="bg-blue-700 text-white px-5 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-t px-6 py-4 space-y-4"
          >
            <a
              href="#features"
              onClick={() => setOpen(false)}
              className="block font-semibold hover:text-blue-600"
            >
              Features
            </a>
            <a
              href="#pipeline"
              onClick={() => setOpen(false)}
              className="block font-semibold hover:text-blue-600"
            >
              Pipeline
            </a>
            <a
              href="#about"
              onClick={() => setOpen(false)}
              className="block font-semibold hover:text-blue-600"
            >
              About
            </a>

            <button
              onClick={() => goTo("/signup")}
              className="w-full bg-blue-700 text-white py-2 rounded-md hover:bg-blue-600 transition"
            >
              Get Started
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
