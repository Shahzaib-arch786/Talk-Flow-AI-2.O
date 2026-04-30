import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Plus, Download, Filter } from "lucide-react";
import AddKnowledgeModal from "../components/AddKnowledgeModel";

export default function KnowledgeBasePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetchKnowledge();
  }, []);

  const BUSINESS_ID = 1; // temporary (later dynamic)

  const fetchKnowledge = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://127.0.0.1:8000/admin/business/${BUSINESS_ID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const response = await res.json();

      const formatted = response.knowledge.map((k) => ({
        question: k.question,
        answer: k.answer,
        tag: "GENERAL",
      }));

      setData(formatted); // ✅ FIXED
      setTotal(formatted.length); // ✅ ADD THIS
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
              <p className="text-sm text-gray-400">
                Admin Console → Knowledge Base
              </p>
              <h1 className="text-3xl font-bold">Knowledge Base</h1>
              <p className="text-gray-500 mt-1 max-w-xl">
                Train your AI with specific context. Add questions and answers
                that your voice agents will use to respond.
              </p>
            </motion.div>

            <div className="flex flex-wrap gap-3 md:justify-end">
              {/* PRIMARY CTA */}
              <button
                onClick={() => setOpenModal(true)}
                className="
      flex items-center gap-2
      bg-linear-to-r from-blue-600 to-blue-700
      text-white px-6 py-3 rounded-xl
      shadow-md hover:shadow-lg
      hover:scale-[1.02]
      transition-all duration-200
      font-medium
    "
              >
                <Plus size={18} />
                Add New Knowledge
              </button>

              {/* SECONDARY CTA */}
              <button
                className="
      flex items-center gap-2
      bg-white border border-gray-200
      text-gray-700 px-6 py-3 rounded-xl
      shadow-sm hover:bg-gray-50
      hover:shadow-md
      transition-all duration-200
      font-medium
    "
              >
                <Download size={18} />
                Upload Document
              </button>
            </div>
          </div>

          {/* MAIN CARD */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border shadow-sm"
          >
            {/* TOP BAR */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex gap-3">
                <span className="text-sm bg-gray-100 px-3 py-1 rounded-lg">
                  Total Entries: <b>{total}</b>
                </span>
                <span className="text-sm bg-green-50 text-green-600 px-3 py-1 rounded-lg">
                  Status: Live
                </span>
              </div>

              <div className="flex gap-3">
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Filter size={16} />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Download size={16} />
                </button>
              </div>
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-gray-400 border-b">
                  <tr>
                    <th className="text-left p-4">QUESTION</th>
                    <th className="text-left p-4">ANSWER PREVIEW</th>
                    <th className="text-left p-4">TAGS</th>
                    <th className="text-left p-4">ACTIONS</th>
                  </tr>
                </thead>

                <tbody>
                  {data.map((item, i) => (
                    <tr
                      key={i}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      <td className="p-4 font-medium">{item.question}</td>

                      <td className="p-4 text-gray-500 truncate max-w-xs">
                        {item.answer}
                      </td>

                      <td className="p-4">
                        <span className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
                          {item.tag || "GENERAL"}
                        </span>
                      </td>

                      <td className="p-4 text-gray-400 cursor-pointer">⋮</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* FOOTER */}
            <div className="flex justify-between items-center p-4 border-t text-sm text-gray-500">
              <span>
                Showing {data.length} of {total} entries
              </span>

              <div className="flex gap-2">
                <button className="px-3 py-1 border rounded-lg">
                  Previous
                </button>
                <button className="px-3 py-1 border rounded-lg bg-gray-100">
                  1
                </button>
                <button className="px-3 py-1 border rounded-lg">2</button>
                <button className="px-3 py-1 border rounded-lg">3</button>
                <button className="px-3 py-1 border rounded-lg">Next</button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <AddKnowledgeModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={fetchKnowledge}
      />
    </div>
  );
}
