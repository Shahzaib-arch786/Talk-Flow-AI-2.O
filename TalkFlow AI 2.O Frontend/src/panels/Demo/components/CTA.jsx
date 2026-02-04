import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section id="get-started" className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="
          bg-blue-700 text-white rounded-2xl 
          px-6 py-12 
          sm:px-12 sm:py-16 
          lg:px-20 lg:py-24 
          text-center 
          hover:shadow-lg transition
        "
      >
        <h2 className="font-bold leading-tight text-2xl sm:text-4xl lg:text-5xl max-w-4xl mx-auto">
          Ready to experience the next generation of voice AI?
        </h2>

        <p className="mt-4 opacity-90 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
          Start your journey with TalkFlow AI today and revolutionize your business communication.
        </p>

        <button
          onClick={() => (window.location.href = "/demo")}
          className="
            mt-8 
            bg-white text-blue-700 
            px-6 py-3 sm:px-8 sm:py-4 
            rounded-xl font-semibold 
            hover:bg-gray-100 transition
          "
        >
          Launch Live Demo
        </button>
      </motion.div>
    </section>
  );
}
