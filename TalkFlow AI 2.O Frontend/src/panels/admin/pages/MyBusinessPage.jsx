import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Play, User2 } from "lucide-react";

export default function MyBusinessPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    language: "English (United States)",
    timezone: "Eastern Time (ET)",
  });

  const [business, setBusiness] = useState(null);

  useEffect(() => {
    fetchBusiness();
  }, []);

  const fetchBusiness = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://127.0.0.1:8000/admin/business/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setBusiness(data);

      setForm({
        name: data.name || "",
        description: data.description || "",
        language: data.language || "English (United States)",
        timezone: data.timezone || "Eastern Time (ET)",
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveBusiness = async () => {
    try {
      const token = localStorage.getItem("token");

      await fetch("http://127.0.0.1:8000/admin/business/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      alert("Saved!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      
      {/* SIDEBAR */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1">
        
        {/* TOPBAR */}
        <Topbar onMenuClick={() => setSidebarOpen(true)} />

        {/* CONTENT */}
        <div className="p-6 space-y-6">

          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="text-3xl font-bold">My Business</h1>
              <p className="text-gray-500 mt-1">
                Manage your business profile and AI voice configuration parameters.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">

            {/* LEFT FORM */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:col-span-2 bg-white p-6 rounded-2xl border shadow-sm space-y-4"
            >

              {/* NAME */}
              <div>
                <label className="text-xs text-gray-500">BUSINESS NAME</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full mt-1 p-3 border rounded-xl"
                />
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="text-xs text-gray-500">DESCRIPTION</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full mt-1 p-3 border rounded-xl"
                />
                <p className="text-xs text-gray-400 mt-1">
                  This description helps AI understand your brand personality.
                </p>
              </div>

              {/* DROPDOWNS */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-500">PRIMARY LANGUAGE</label>
                  <select
                    name="language"
                    value={form.language}
                    onChange={handleChange}
                    className="w-full mt-1 p-3 border rounded-xl"
                  >
                    <option>English (United States)</option>
                    <option>Urdu</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-gray-500">DEFAULT TIMEZONE</label>
                  <select
                    name="timezone"
                    value={form.timezone}
                    onChange={handleChange}
                    className="w-full mt-1 p-3 border rounded-xl"
                  >
                    <option>Eastern Time (ET)</option>
                    <option>GMT</option>
                  </select>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex justify-end gap-3 pt-4">
                <button className="text-gray-500">Discard</button>
                <button
                  onClick={saveBusiness}
                  className="bg-blue-600 text-white px-5 py-2 rounded-xl"
                >
                  Save Changes
                </button>
              </div>
            </motion.div>

            {/* RIGHT SIDE */}
            <div className="space-y-4">

              {/* BUSINESS INFO CARD */}
              <div className="bg-white p-5 rounded-2xl border shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-xl" />
                  <div>
                    <h3 className="font-semibold">{form.name}</h3>
                    <p className="text-green-500 text-sm">● Active Account</p>
                  </div>
                </div>

                <div className="mt-4 space-y-2 text-sm text-gray-600">
                  <p>Organization ID: TF-88219-X</p>
                  <p>Created On: Oct 12, 2023</p>
                  <p>
                    Plan: <span className="text-blue-600">Enterprise Plus</span>
                  </p>
                  <p>Agents: 24 active</p>
                </div>
              </div>

              {/* VOICE CARD */}
              <div className="bg-white p-5 rounded-2xl border shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <User2 size={16} />
                  <h4 className="font-semibold">Voice Identity</h4>
                </div>

                <p className="text-sm text-gray-500">
                  Your current business settings are optimized for a professional voice profile.
                </p>

                <button className="mt-4 flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-xl">
                  <Play size={16} /> Preview Sample
                </button>
              </div>

              {/* SUPPORT */}
              <div className="bg-white p-5 rounded-2xl border shadow-sm">
                <h4 className="font-semibold mb-2">Need Assistance?</h4>
                <p className="text-sm text-gray-500">
                  Our team is available 24/7 to help with onboarding.
                </p>

                <button className="text-blue-600 mt-3">
                  Contact Support →
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}