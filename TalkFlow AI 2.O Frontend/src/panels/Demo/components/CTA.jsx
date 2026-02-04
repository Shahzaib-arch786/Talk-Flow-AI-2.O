import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section id="get-started" className="max-w-7xl mx-auto px-6 py-16">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="bg-blue-700 text-white rounded-2xl p-28 text-center mb-8"
      >
        <h2 className="text-7xl font-bold">
          Ready to experience the next generation of voice AI?
        </h2>

        <p className="mt-4 opacity-90 text-lg">
          Start your journey with TalkFlow AI today and revolutionize your business communication.
        </p>

        <button className="bg-white text-blue-700 px-6 py-3 rounded-xl mt-6">
          Launch Live Demo
        </button>
      </motion.div>
    </section>
  );
}