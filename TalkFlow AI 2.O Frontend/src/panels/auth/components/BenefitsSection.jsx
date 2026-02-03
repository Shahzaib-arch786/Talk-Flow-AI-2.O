import { CheckCircle, Zap, Shield } from "lucide-react";
import { motion } from "framer-motion";

export default function BenefitsSection() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      className="max-w-lg"
    >
      <h1 className="text-5xl font-bold leading-tight">
        Empower your team  
        with TalkFlow AI
      </h1>

      <p className="text-blue-600 mt-4">
        Join thousands of businesses scaling their operations  
        with enterprise-grade AI automation.
      </p>

      <div className="mt-8 space-y-5">

        <div className="flex gap-3">
          <CheckCircle className="text-blue-600" />
          <div>
            <p className="font-semibold">No credit card required</p>
            <p className="text-sm text-blue-600">
              Start exploring all features immediately with our 14-day free trial.
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Zap className="text-blue-600" />
          <div>
            <p className="font-semibold">Setup in 2 minutes</p>
            <p className="text-sm text-blue-600">
              Our intuitive onboarding gets your first AI agent live in record time.
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Shield className="text-blue-600" />
          <div>
            <p className="font-semibold">Enterprise-grade security</p>
            <p className="text-sm text-blue-600">
              SOC2 Type II compliant with end-to-end data encryption.
            </p>
          </div>
        </div>

      </div>
    </motion.div>
  );
}