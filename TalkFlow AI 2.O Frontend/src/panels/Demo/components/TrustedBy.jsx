import { motion } from "framer-motion";
import { Phone, MessageCircle, Facebook, Twitter } from "lucide-react";

const companies = [
  { icon: Phone },
  { icon: MessageCircle },
  { icon: Facebook },
  { icon: Twitter },
];
export default function TrustedBy() {
  return (
    <div className="text-center py-8 opacity-70">
      <p className="text-sm tracking-widest mb-3">TRUSTED BY INNOVATORS AT</p>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="flex justify-center gap-6"
      >
        {companies.map((company) => (
          <div key={company.icon} className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
            <company.icon className="text-gray-500" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
