import { motion } from "framer-motion";
import {
  Brain,
  Mic,
  MessageSquare,
  Clock3,
  AudioLines,
  Sparkles
} from "lucide-react";

export default function RightPanel({ analysis }) {
  if (!analysis) {
    return (
      <div className="space-y-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm h-125 flex flex-col justify-center items-center text-center">
          <Brain className="text-blue-600 mb-4" size={40} />
          <h3 className="font-semibold text-lg">
            Real-Time AI Analysis
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            Start chatting or speaking with your AI assistant to see live analytics.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">

      {/* MODE */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-2xl p-5 shadow-sm"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-sm text-gray-400">
            Interaction Mode
          </h3>

          {analysis.mode === "voice" ? (
            <Mic className="text-blue-600" size={20} />
          ) : (
            <MessageSquare className="text-green-600" size={20} />
          )}
        </div>

        <p className="mt-3 font-semibold text-lg capitalize">
          {analysis.mode}
        </p>
      </motion.div>

      {/* INTENT */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-2xl p-5 shadow-sm"
      >
        <h3 className="text-sm text-gray-400 mb-3">
          Detected Intent
        </h3>

        <p className="text-blue-600 font-semibold">
          {analysis.intent}
        </p>

        <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 rounded-full"
            style={{
              width: `${analysis.confidence}%`
            }}
          />
        </div>

        <p className="text-xs mt-2 text-gray-500">
          {analysis.confidence}% confidence
        </p>
      </motion.div>

      {/* VOICE ONLY */}
      {analysis.mode === "voice" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-2xl p-5 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-3">
            <AudioLines size={18} className="text-purple-600" />
            <h3 className="text-sm text-gray-400">
              Voice Analysis
            </h3>
          </div>

          <p className="text-sm text-gray-700">
            {analysis.transcription}
          </p>

          <div className="mt-3 text-sm text-green-600 font-medium">
            Audio: {analysis.audioStatus}
          </div>
        </motion.div>
      )}

      {/* PERFORMANCE */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-linear-to-br from-blue-600 to-indigo-700 text-white rounded-2xl p-5 shadow-lg"
      >
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={18} />
          <h3 className="font-medium">
            AI Performance
          </h3>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span>Latency</span>
            <span>{analysis.latency}</span>
          </div>

          {analysis.tokens && (
            <div className="flex justify-between">
              <span>Tokens Used</span>
              <span>{analysis.tokens}</span>
            </div>
          )}

          <div className="flex justify-between">
            <span>Status</span>
            <span>Optimized</span>
          </div>
        </div>
      </motion.div>

      {/* RESPONSE PREVIEW */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-2xl p-5 shadow-sm"
      >
        <div className="flex items-center gap-2 mb-3">
          <Clock3 size={18} className="text-blue-600" />
          <h3 className="text-sm text-gray-400">
            Latest Response
          </h3>
        </div>

        <p className="text-sm text-gray-700 line-clamp-5">
          {analysis.response}
        </p>
      </motion.div>
    </div>
  );
}