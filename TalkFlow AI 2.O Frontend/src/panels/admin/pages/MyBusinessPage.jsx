import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Play, User2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MyBusinessPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

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

      const res = await fetch("http://127.0.0.1:8000/admin/business/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      // all businesses list
      setBusiness(data);

      // active business autofill form
      const activeBusiness = data.find((b) => b.is_active);

      if (activeBusiness) {
        setForm({
          name: activeBusiness.name || "",
          description: activeBusiness.description || "",
          language: activeBusiness.language || "English",
          timezone: "GMT",
        });
      }
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

      const res = await fetch("http://127.0.0.1:8000/admin/business/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const newBusiness = await res.json();

      localStorage.setItem("activeBusinessId", newBusiness.id);

      alert("Business saved successfully");

      // refresh businesses
      fetchBusiness();

      // move to knowledge page
      navigate("/admin/knowledge");
    } catch (err) {
      console.error(err);
    }
  };

  const deleteBusiness = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await fetch(`http://127.0.0.1:8000/admin/business/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const activeId = localStorage.getItem("activeBusinessId");

      if (Number(activeId) === id) {
        localStorage.removeItem("activeBusinessId");
      }

      fetchBusiness();
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
                Manage your business profile and AI voice configuration
                parameters.
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
                  <label className="text-xs text-gray-500">
                    PRIMARY LANGUAGE
                  </label>
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
                  <label className="text-xs text-gray-500">
                    DEFAULT TIMEZONE
                  </label>
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
                <h3 className="font-semibold mb-4">Saved Businesses</h3>

                <div className="space-y-3 max-h-75 overflow-y-auto">
                  {business?.length > 0 ? (
                    business.map((item) => (
                      <div
                        key={item.id}
                        className="border rounded-xl p-3 flex justify-between items-center"
                      >
                        <div>
                          <h4 className="font-medium">{item.name}</h4>

                          <p className="text-xs text-gray-500">
                            {item.is_active ? (
                              <span className="text-green-600 font-medium">
                                Active Business
                              </span>
                            ) : (
                              "Inactive"
                            )}
                          </p>
                        </div>

                        <button
                          onClick={() => deleteBusiness(item.id)}
                          className="text-red-500 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-400">
                      No businesses created yet
                    </p>
                  )}
                </div>
              </div>

              {/* VOICE CARD */}
              <div className="bg-white p-5 rounded-2xl border shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <User2 size={16} />
                  <h4 className="font-semibold">Voice Identity</h4>
                </div>

                <p className="text-sm text-gray-500">
                  Your current business settings are optimized for a
                  professional voice profile.
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
