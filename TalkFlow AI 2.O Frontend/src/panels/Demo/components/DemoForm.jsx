import { User, Mail, Globe, Languages, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useDemoForm from "../hooks/useDemoForm";

export default function DemoForm() {
  const {
    form,
    handleChange,
    handleSubmit,
    loading,
    error,
    setError,
    setLanguage
  } = useDemoForm();

  return (
    <>
      {/* 🔔 TOP ERROR TOAST */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 bg-white shadow-xl border border-red-200 rounded-xl px-6 py-4 z-50 w-[90%] max-w-md"
          >
            <div className="flex items-start gap-3">
              <div className="bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center font-bold">
                !
              </div>

              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">
                  Demo Already Active
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  {error}
                </p>
              </div>

              <button
                onClick={() => setError("")}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🧾 MAIN CARD */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white max-w-[95%] rounded-xl shadow-2xl p-8 border border-gray-200 md:max-w-md lg:max-w-lg mb-10 mx-auto"
      >
        <h2 className="text-2xl font-bold text-center">
          Try TalkFlow AI
        </h2>

        <p className="text-center text-blue-600 mt-2">
          No login required — experience the future of AI calls in seconds
        </p>

        {/* NAME */}
        <div className="mt-6">
          <label className="font-medium text-sm">Full Name</label>
          <div className="relative mt-1">
            <User className="absolute left-3 top-3 text-blue-600" size={18} />
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Jane Doe"
              className="w-full pl-10 p-3 bg-gray-50 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {/* EMAIL */}
        <div className="mt-4">
          <label className="font-medium text-sm">Business Email</label>
          <div className="relative mt-1">
            <Mail className="absolute left-3 top-3 text-blue-600" size={18} />
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="jane@company.com"
              className="w-full pl-10 p-3 bg-gray-50 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {/* LANGUAGE */}
        <div className="mt-5">
          <label className="font-medium text-sm">Preferred Language</label>
          <div className="grid grid-cols-2 gap-3 mt-2">
            <button
              type="button"
              onClick={() => setLanguage("English")}
              className={`flex items-center justify-center gap-2 p-3 rounded-md border ${
                form.language === "English"
                  ? "border-blue-600 text-blue-600"
                  : "bg-gray-50"
              }`}
            >
              <Globe size={18} />
              English
            </button>

            <button
              type="button"
              onClick={() => setLanguage("Urdu")}
              className={`flex items-center justify-center gap-2 p-3 rounded-md border ${
                form.language === "Urdu"
                  ? "border-blue-600 text-blue-600"
                  : "bg-gray-50"
              }`}
            >
              <Languages size={18} />
              Urdu
            </button>
          </div>
        </div>

        {/* SUBMIT */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={handleSubmit}
          disabled={loading}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 transition text-white p-3 rounded-md flex items-center justify-center gap-2"
        >
          <Phone size={18} />
          {loading ? "Starting..." : "Start AI Call Demo"}
        </motion.button>

        <p className="text-xs text-center text-gray-500 mt-4">
          By clicking, you agree to our Terms of Service and Privacy Policy.
        </p>
      </motion.div>
    </>
  );
}