import { motion } from "framer-motion";

export default function TrustedBy() {
  return (
    <div className="text-center py-8 opacity-70">
      <p className="text-sm tracking-widest mb-3">
        TRUSTED BY INNOVATORS AT
      </p>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="flex justify-center gap-6"
      >
        {[1,2,3,4].map(i => (
          <div key={i} className="w-10 h-10 bg-gray-200 rounded"></div>
        ))}
      </motion.div>
    </div>
  );
}