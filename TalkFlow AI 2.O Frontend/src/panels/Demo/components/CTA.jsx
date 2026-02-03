import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="bg-blue-700 text-white rounded-3xl p-12 text-center"
      >
        <h2 className="text-4xl font-bold">
          Ready to experience the next generation of voice AI?
        </h2>

        <p className="mt-4 opacity-90">
          Start your journey with TalkFlow AI today.
        </p>

        <button className="bg-white text-blue-700 px-6 py-3 rounded-xl mt-6">
          Launch Live Demo
        </button>
      </motion.div>
    </section>
  );
}