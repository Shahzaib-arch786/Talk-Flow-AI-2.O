import { Building, Mail, Lock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import useSignup from "../hooks/useSignup";

export default function SignupCard() {
  const { form, handleChange, submit } = useSignup();

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-2xl shadow-xl border p-8"
    >
      <h2 className="text-2xl font-bold">
        Create your account
      </h2>

      <p className="text-blue-600 text-sm">
        Scale your business communication today.
      </p>

      {/* BUSINESS */}
      <div className="mt-5">
        <label className="text-sm font-medium">Business Name</label>

        <div className="relative mt-1">
          <Building className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            name="business"
            value={form.business}
            onChange={handleChange}
            placeholder="Acme Corp"
            className="w-full pl-10 p-3 bg-gray-50 border rounded-xl"
          />
        </div>
      </div>

      {/* EMAIL */}
      <div className="mt-4">
        <label className="text-sm font-medium">Work Email</label>

        <div className="relative mt-1">
          <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="name@company.com"
            className="w-full pl-10 p-3 bg-gray-50 border rounded-xl"
          />
        </div>
      </div>

      {/* PASSWORD */}
      <div className="mt-4">
        <label className="text-sm font-medium">Create Password</label>

        <div className="relative mt-1">
          <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full pl-10 p-3 bg-gray-50 border rounded-xl"
          />
        </div>
      </div>

      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={submit}
        className="w-full mt-5 bg-blue-700 text-white p-3 rounded-xl flex items-center justify-center gap-2"
      >
        Start Free Trial
        <ArrowRight size={16} />
      </motion.button>

      <p className="text-xs text-gray-500 mt-3 text-center">
        By signing up, you agree to our Terms of Service and Privacy Policy.
      </p>

    </motion.div>
  );
}