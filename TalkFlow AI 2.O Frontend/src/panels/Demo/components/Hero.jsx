import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="text-blue-600 bg-blue-200 px-3 py-1 rounded-full text-sm font-bold">
          FYP PROJECT SPOTLIGHT
        </span>

        <h1 className="text-5xl font-bold mt-6 leading-tight">
          TalkFlow AI:  
          The Future of Automated Conversations
        </h1>

        <p className="text-gray-600 mt-4">
          Seamlessly bridge the gap between human speech and machine intelligence
          with our end-to-end STT-NLP-TTS pipeline.
        </p>

        <div className="flex gap-4 mt-6">
          <button className="bg-blue-700 hover:bg-blue-600 text-white px-6 py-3 rounded-md">
            Try Live Demo
          </button>

          <button className="bg-gray-200 hover:bg-gray-300 px-6 py-3 rounded-md">
            For Businesses
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: .9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-black rounded-2xl h-80 shadow-xl"
      >
        <img className="h-80 rounded-2xl w-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0WXjML7QTqpN0c4KTkbjOEwErveHmmvDgZS_9AGQt-Nijx3K3DEsXU7Bai57jehQHg8MmX6pQs0gYUbQKocouljnKxxvAyAe02pYQhjZw1VqM6wq0ozCxo5kSkdVCehCVOjy3hSTO8JCKLuDNzMWLvkSDq6EIUvbey6uF25gIB4-JxCpBkYJu0gnnDPA2J4HSlnaJY3SsOpTd3xZWqLi7tRTdilX-MlbrZJIvRVK9PzQMdBZxnlZCK-zSDf1dl_OtzN5gJLlhiXg" alt="" />
      </motion.div>

    </section>
  );
}