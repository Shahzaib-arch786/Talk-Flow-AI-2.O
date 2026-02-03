import { motion } from "framer-motion"
import { Headset } from "lucide-react"

export default function AuthHero({
  gradientFrom = "#1d4ed8", // blue-700
  gradientTo = "#312e81",   // indigo-900
}) {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to bottom right, ${gradientFrom}, ${gradientTo})`,
      }}
      className="hidden lg:flex flex-col justify-between text-white p-12"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 text-xl font-semibold">
          <Headset className="w-6 h-6" />
          TalkFlow AI
        </div>

        <h1 className="mt-12 text-5xl font-bold leading-tight">
          Scale your customer operations with AI-powered voice intelligence.
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-lg p-6 rounded-xl max-w-md"
      >
        <p className="italic text-sm">
          “TalkFlow transformed our support desk overnight. We’ve seen a 40%
          reduction in response times while maintaining a human-like
          experience.”
        </p>

        <div className="mt-4 text-sm font-medium">
          Sarah Jenkins
          <span className="block text-xs opacity-80">
            Operations Lead, TechCorp
          </span>
        </div>
      </motion.div>
    </div>
  )
}
