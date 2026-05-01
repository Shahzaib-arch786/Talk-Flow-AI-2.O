import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { motion } from "framer-motion";
import { streamAI } from "../hooks/streamAI";

export default function ChatPanel({ ai }) {
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef(null);

  const scrollToBottom = () => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [ai.messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const token = localStorage.getItem("token");
    const userText = input;

    // add user message
    ai.setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setInput("");

    let aiText = "";
    setIsTyping(true);

    // add empty AI message
    ai.setMessages((prev) => [...prev, { role: "ai", text: "" }]);

    await streamAI(userText, token, (chunk) => {
      aiText += chunk;

      ai.setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1].text = aiText;
        return updated;
      });
    });

    setIsTyping(false);
    ai.setAnalysis({
      mode: "chat",
      intent: "Business Query",
      confidence: 96,
      response: aiText,
      latency: "1.2s",
      tokens: Math.floor(aiText.length / 4),
    });
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* 🔥 MESSAGES AREA */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        {ai.messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-end gap-3 ${
              m.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {/* AI Avatar */}
            {m.role === "ai" && (
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">
                AI
              </div>
            )}

            {/* Message Bubble */}
            <div
              className={`max-w-[65%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                m.role === "user"
                  ? "bg-blue-600 text-white rounded-br-md"
                  : "bg-white text-gray-800 border rounded-bl-md"
              }`}
            >
              {m.text}
            </div>

            {/* User Avatar */}
            {m.role === "user" && (
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold">
                You
              </div>
            )}
          </motion.div>
        ))}

        {/* ✨ Typing Indicator */}
        {isTyping && (
          <div className="flex items-center gap-2">
            {/* <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm">
              AI
            </div> */}

            <div className="bg-white px-4 py-2 rounded-2xl shadow-sm flex gap-1">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
            </div>
          </div>
        )}

        <div ref={endRef} />
      </div>

      {/* 🔥 INPUT BAR (STICKY + PREMIUM) */}
      <div className="border-t bg-white px-4 py-3">
        <div className="flex items-center gap-2 max-w-4xl mx-auto">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Ask anything about your business..."
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={sendMessage}
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl shadow-md transition"
          >
            <Send size={18} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
