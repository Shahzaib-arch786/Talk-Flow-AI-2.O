import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AddKnowledgeModal({ open, onClose, onSuccess, businessId }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [tag, setTag] = useState("");

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      await fetch("http://127.0.0.1:8000/admin/business/knowledge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          business_id: businessId,
          question,
          answer,
          tag,
        }),
      });

      onSuccess();
      onClose();

      setQuestion("");
      setAnswer("");
      setTag("");

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* BACKDROP */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* MODAL */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="fixed z-50 bg-white rounded-2xl p-6 w-full max-w-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-xl"
          >
            <h2 className="text-xl font-bold mb-4">Add Knowledge</h2>

            <input
              placeholder="Question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full mb-3 p-3 border rounded-lg"
            />

            <textarea
              placeholder="Answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full mb-3 p-3 border rounded-lg"
            />

            <input
              placeholder="Tag (optional)"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="w-full mb-4 p-3 border rounded-lg"
            />

            <div className="flex justify-end gap-3">
              <button onClick={onClose}>Cancel</button>

              <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Save
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}