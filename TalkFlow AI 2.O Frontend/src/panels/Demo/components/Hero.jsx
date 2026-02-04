import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 mt-14 mb-12 sm:px-8 lg:px-12 grid gap-12 md:grid-cols-2 items-center">
      
      {/* Text Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="inline-block text-blue-600 bg-blue-100 px-3 py-1 rounded-full text-xs sm:text-sm font-bold">
          FYP PROJECT SPOTLIGHT
        </span>

        <h1 className="mt-6 font-bold leading-tight
          text-3xl
          sm:text-4xl
          lg:text-5xl
        ">
          TalkFlow AI:
          <br />
          The Future of Automated Conversations
        </h1>

        <p className="text-gray-600 mt-4 text-sm sm:text-base max-w-xl">
          Seamlessly bridge the gap between human speech and machine intelligence
          with our end-to-end STT-NLP-TTS pipeline.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <button
            className="w-full sm:w-auto bg-blue-700 hover:bg-blue-600 text-white px-6 py-3 rounded-md transition"
            onClick={() => window.location.href = "#get-started"}
          >
            Try Live Demo
          </button>

          <button
            className="w-full sm:w-auto bg-gray-200 hover:bg-gray-300 px-6 py-3 rounded-md transition"
            onClick={() => window.location.href = "/signup"}
          >
            For Businesses
          </button>
        </div>
      </motion.div>

      {/* Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-black rounded-2xl shadow-xl p-4"
      >
        <img
          className="w-full h-auto rounded-xl max-w-md mx-auto"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0WXjML7QTqpN0c4KTkbjOEwErveHmmvDgZS_9AGQt-Nijx3K3DEsXU7Bai57jehQHg8MmX6pQs0gYUbQKocouljnKxxvAyAe02pYQhjZw1VqM6wq0ozCxo5kSkdVCehCVOjy3hSTO8JCKLuDNzMWLvkSDq6EIUvbey6uF25gIB4-JxCpBkYJu0gnnDPA2J4HSlnaJY3SsOpTd3xZWqLi7tRTdilX-MlbrZJIvRVK9PzQMdBZxnlZCK-zSDf1dl_OtzN5gJLlhiXg"
          alt="AI waveform visualization"
        />
      </motion.div>

    </section>
  );
}
