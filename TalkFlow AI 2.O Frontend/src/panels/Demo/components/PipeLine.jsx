import { Mic, Brain, Volume2 } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: Mic,
    title: "1. Speech-to-Text",
    desc: "Whisper-powered transcription engine with 99% accuracy across 32+ languages."
  },
  {
    icon: Brain,
    title: "2. NLP Processing",
    desc: "Large Language Models analyzing intent, sentiment and context."
  },
  {
    icon: Volume2,
    title: "3. Text-to-Speech",
    desc: "Neural voice synthesis delivering natural responses."
  }
];

export default function Pipeline() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-3xl font-bold text-center">
          Our Technology Pipeline
        </h2>

        <div className="grid md:grid-cols-3 gap-6 mt-10">

          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-gray-50 p-6 rounded-2xl border"
            >
              <s.icon className="text-blue-600 mb-4" />
              <h3 className="font-semibold">{s.title}</h3>
              <p className="text-gray-600 text-sm mt-2">{s.desc}</p>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}