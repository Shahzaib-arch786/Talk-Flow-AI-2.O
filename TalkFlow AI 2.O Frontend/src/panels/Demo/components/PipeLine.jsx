import { Mic, Brain, Volume2 } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: Mic,
    title: "1. Speech-to-Text",
    desc: "Whisper-powered transcription engine with 99% accuracy across 32+ languages.",
  },
  {
    icon: Brain,
    title: "2. NLP Processing",
    desc: "Large Language Models (LLMs) analyzing intent, sentiment and contextual entities in real-time.",
  },
  {
    icon: Volume2,
    title: "3. Text-to-Speech",
    desc: "Neural voice synthesis delivering emotionally resonant and natural human-like responses.",
  },
];

export default function Pipeline() {
  return (
    <section id="pipeline" className="bg-white py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          Our Technology Pipeline
        </h2>

        <p className="text-center text-gray-600 mt-3 text-sm sm:text-base max-w-2xl mx-auto">
          A sophisticated 3-step process that converts spoken words into meaningful,
          automated interactions.
        </p>

        <div className="grid gap-6 mt-10 sm:grid-cols-2 md:grid-cols-3">

          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gray-100 p-6 sm:p-8 rounded-2xl border hover:shadow-md transition"
            >
              <s.icon className="text-blue-700 mb-4 w-8 h-8" />

              <h3 className="font-bold text-lg sm:text-xl">
                {s.title}
              </h3>

              <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
