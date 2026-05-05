import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Plus,
  Upload,
  Filter,
  Trash2,
  Pencil,
  FileText,
  Database,
  CheckCircle,
} from "lucide-react";
import AddKnowledgeModal from "../components/AddKnowledgeModel";
import { useNavigate } from "react-router-dom";

export default function KnowledgeBasePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [activeBusiness, setActiveBusiness] = useState(null);
  const [activeTab, setActiveTab] = useState("faq");
  const [uploading, setUploading] = useState(false);
  const [uploadedDocs, setUploadedDocs] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchActiveBusiness();
  }, []);

  // =========================
  // FETCH ACTIVE BUSINESS
  // =========================
  const fetchActiveBusiness = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://127.0.0.1:8000/admin/business/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const businesses = await res.json();
      const active = businesses.find((b) => b.is_active);

      if (active) {
        setActiveBusiness(active);
        fetchKnowledge(active.id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // =========================
  // FETCH FAQ KNOWLEDGE
  // =========================
  const fetchKnowledge = async (businessId = activeBusiness?.id) => {
    try {
      if (!businessId) return;

      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://127.0.0.1:8000/admin/business/${businessId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const response = await res.json();

      const formatted = response.knowledge.map((k) => ({
        id: k.id,
        question: k.question,
        answer: k.answer,
        tag: "FAQ",
      }));

      setData(formatted);
      setTotal(formatted.length);
    } catch (err) {
      console.error(err);
    }
  };

  // =========================
  // DELETE FAQ
  // =========================
  const deleteKnowledge = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await fetch(`http://127.0.0.1:8000/admin/dashboard/knowledge/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchKnowledge();
    } catch (err) {
      console.error(err);
    }
  };

  // =========================
  // RAG DOCUMENT UPLOAD
  // =========================
  const handleUpload = async (file) => {
    try {
      setUploading(true);

      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("http://127.0.0.1:8000/rag/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await res.json();

      setUploadedDocs((prev) => [
        ...prev,
        {
          name: file.name,
          status: "Processed",
          chunks: result.chunks_saved,
        },
      ]);
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />

        <div className="p-4 md:p-6 space-y-6">
          {/* HEADER */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div className="max-w-2xl">
              <p className="text-xs sm:text-sm text-gray-400">
                Admin Console → AI Training
              </p>

              <h1 className="text-2xl sm:text-4xl font-bold leading-tight mt-2">
                Knowledge Intelligence Hub
              </h1>

              <p className="text-sm sm:text-base text-gray-500 mt-3 leading-relaxed">
                Train your AI through structured FAQs or upload real business
                documents for RAG-powered responses.
              </p>
            </div>

            <button
              onClick={() => navigate("/admin/test-ai")}
              className="
      w-full sm:w-auto
      bg-blue-600 hover:bg-blue-700
      text-white px-6 py-3
      rounded-xl shadow-md
      font-medium
      transition
    "
            >
              Test AI Model
            </button>
          </div>

          {/* TOGGLE */}
          <div className="bg-white p-2 rounded-2xl shadow-sm w-full sm:w-fit">
            {["faq", "documents"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 sm:flex-none
px-4 sm:px-6
py-3
rounded-xl
font-medium
text-sm sm:text-base
transition ${activeTab === tab ? "bg-blue-600 text-white" : "text-gray-500"}`}
              >
                {tab === "faq" ? "Manual FAQ Training" : "RAG Documents"}
              </button>
            ))}
          </div>

          {/* FAQ TAB */}
          {activeTab === "faq" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl shadow-sm"
            >
              {/* top bar */}
              <div className="p-5 border-b flex justify-between flex-wrap gap-3">
                <div className="flex gap-3 flex-wrap">
                  <span className="bg-gray-100 px-3 py-1 rounded-lg text-sm">
                    Total FAQs: {total}
                  </span>

                  <span className="bg-green-50 text-green-600 px-3 py-1 rounded-lg text-sm">
                    AI Ready
                  </span>
                </div>

                <button
                  onClick={() => setOpenModal(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center gap-2"
                >
                  <Plus size={16} />
                  Add FAQ
                </button>
              </div>

              {/* table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm min-w-[700px]">
                  <thead className="border-b text-gray-400">
                    <tr>
                      <th className="text-left p-4">Question</th>
                      <th className="text-left p-4">Answer</th>
                      <th className="text-left p-4">Tag</th>
                      <th className="text-left p-4">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    
                      {data.map((item) => (
                        <div
                          key={item.id}
                          className="border rounded-2xl p-4 bg-gray-50"
                        >
                          <h3 className="font-semibold text-sm">
                            {item.question}
                          </h3>

                          <p className="text-gray-500 text-sm mt-2">
                            {item.answer}
                          </p>

                          <div className="flex justify-between items-center mt-4">
                            <span className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
                              FAQ
                            </span>

                            <div className="flex gap-3">
                              <button className="text-blue-600">
                                <Pencil size={16} />
                              </button>

                              <button
                                onClick={() => deleteKnowledge(item.id)}
                                className="text-red-600"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* DOCUMENT TAB */}
          {activeTab === "documents" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {/* Upload Card */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Database className="text-blue-600" />
                  <h2 className="text-xl font-bold">
                    Upload Business Documents
                  </h2>
                </div>

                <p className="text-gray-500 mb-6">
                  Upload PDFs, DOCX, or TXT files. Your AI will automatically
                  process them using RAG.
                </p>

                <label className="border-2 border-dashed border-blue-300 rounded-2xl p-6 sm:p-10 min-h-[180px] sm:min-h-[260px] flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 transition">
                  <Upload className="text-blue-600 mb-3" />

                  <p className="font-medium">Click to upload documents</p>

                  <p className="text-xs sm:text-sm text-gray-500 mt-1 text-center">
                    PDF • DOCX • TXT
                  </p>

                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => handleUpload(e.target.files[0])}
                  />
                </label>

                {uploading && (
                  <div className="mt-4 text-blue-600 font-medium">
                    Processing document...
                  </div>
                )}
              </div>

              {/* Uploaded Docs */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="text-lg font-bold mb-4">Processed Documents</h3>

                {uploadedDocs.length === 0 ? (
                  <p className="text-gray-400">No documents uploaded yet.</p>
                ) : (
                  uploadedDocs.map((doc, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center border-b py-4"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="text-blue-600" />
                        <div>
                          <p className="font-medium text-center text-sm sm:text-lg">
                            {doc.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {doc.chunks} chunks created
                          </p>
                        </div>
                      </div>

                      <span className="flex items-center gap-2 text-green-600 text-sm">
                        <CheckCircle size={16} />
                        Processed
                      </span>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <AddKnowledgeModal
        open={openModal}
        businessId={activeBusiness?.id}
        onClose={() => setOpenModal(false)}
        onSuccess={fetchKnowledge}
      />
    </div>
  );
}
