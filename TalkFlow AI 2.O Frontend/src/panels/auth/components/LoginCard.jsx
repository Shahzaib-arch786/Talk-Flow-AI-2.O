import { motion } from "framer-motion";
import { Mail, Lock } from "lucide-react";
import useLogin from "../hooks/useLogin";

export default function LoginCard() {
  const { form, handleChange, handleSubmit, googleLogin } = useLogin();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white max-w-[95%] rounded-2xl shadow-xl p-8 border md:max-w-md mx-auto"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold">
          Sign in to TalkFlow
        </h2>

        <p className="text-blue-600 text-sm mt-1">
          Enter your business credentials to access your dashboard.
        </p>
      </div>

      {/* EMAIL */}
      <div className="mt-6">
        <label className="font-medium text-sm">Email Address</label>

        <div className="relative mt-1">
          <Mail className="absolute left-3 top-3 text-blue-600" size={18} />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="name@company.com"
            className="w-full pl-10 p-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* PASSWORD */}
      <div className="mt-4">
        <div className="flex justify-between text-sm">
          <label className="font-medium">Password</label>
          <span className="text-blue-600 cursor-pointer">
            Forgot password?
          </span>
        </div>

        <div className="relative mt-1">
          <Lock className="absolute left-3 top-3 text-blue-600" size={18} />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full pl-10 p-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* LOGIN */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={handleSubmit}
        className="w-full bg-blue-700 text-white p-3 rounded-xl mt-6"
      >
        Log in
      </motion.button>

      <div className="flex items-center gap-3 my-5 text-gray-400 text-xs">
        <div className="h-0.5 bg-gray-200 flex-1"></div>
        OR CONTINUE WITH
        <div className="h-0.5 bg-gray-200 flex-1"></div>
      </div>

      {/* GOOGLE */}
      <button
        onClick={googleLogin}
        className="w-full border p-3 rounded-xl flex items-center justify-center gap-2"
      >
        <img
          src="https://www.google.com/favicon.ico"
          className="w-5"
        />
        Google
      </button>

      <p className="text-center text-sm mt-5">
        Don’t have an account?{" "}
        <span className="text-blue-600 cursor-pointer">
          Create one
        </span>
      </p>
    </motion.div>
  );
}