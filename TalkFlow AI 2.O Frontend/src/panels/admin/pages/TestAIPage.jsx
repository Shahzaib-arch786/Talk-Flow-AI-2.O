import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { useState } from "react";
import { motion } from "framer-motion";
import { useAI } from "../hooks/useAI";

import ChatPanel from "../components/ChatPanel";
import VoicePanel from "../components/VoicePanel";
import RightPanel from "../components/RightPanel";

export default function TestAIPage() {
  const ai = useAI({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mode, setMode] = useState("chat");

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />

        <div className="p-6 grid md:grid-cols-3 gap-6">
          {/* LEFT MAIN PANEL */}
          <div className="md:col-span-2 bg-white rounded-2xl shadow-sm p-6 flex flex-col">
            {/* HEADER */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <h1 className="text-2xl font-bold">Test AI Playground</h1>
                <p className="text-gray-500 text-sm">
                  Interact with your AI in real-time
                </p>
              </div>

              {/* TOGGLE */}
              <div className="flex bg-gray-100 p-1 rounded-xl">
                {["chat", "voice"].map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`px-4 py-2 rounded-lg text-sm transition ${
                      mode === m
                        ? "bg-white shadow text-blue-600"
                        : "text-gray-500"
                    }`}
                  >
                    {m === "chat" ? "Chat" : "Voice"}
                  </button>
                ))}
              </div>
            </div>

            {/* CONTENT SWITCH */}
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="flex-1"
            >
              {mode === "chat" ? <ChatPanel ai={ai} /> : <VoicePanel ai={ai} />}
            </motion.div>
          </div>

          {/* RIGHT PANEL */}
          <RightPanel analysis={ai.analysis} />
        </div>
      </div>
    </div>
  );
}
