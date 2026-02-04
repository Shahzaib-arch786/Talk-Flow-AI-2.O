import { Clock, Activity, User, Target } from "lucide-react";

const features = [
  {
    icon: Activity,
    title: "Real-time Understanding",
    desc: "Processes audio instantly with sub-200ms delay. "
  },
  {
    icon: Target,
    title: "Intent Detection",
    desc: "95% precision using fine-tuned models."
  },
  {
    icon: User,
    title: "Human-like Voice",
    desc: "Natural neural voices with prosody control."
  },
  {
    icon: Clock,
    title: "Low Latency",
    desc: "Optimized pipeline for fluid interaction."
  }
];

export default function Features() {
  return (
    <section id="features" className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-8">

      <div>
        <span className="text-white font-bold bg-blue-700 px-3 py-1 rounded-full">
          FEATURES
        </span>

        <h2 className="text-4xl font-bold mt-4">
          Engineered for Excellence
        </h2>

        <p className="text-gray-600 mt-3">
          State-of-the-art models for mission critical operations. Our platform leverage state of the art models to deliver unparalleled performance in speech recognition and synthesis.
        </p>
      </div>

      <div className="md:col-span-2 grid md:grid-cols-2 gap-6">
        {features.map((f, i) => (
          <div key={i} className="bg-white p-12 rounded-xl border flex flex-col items-center text-center">
            <f.icon className="text-blue-700 mb-3" />
            <h3 className="font-bold text-2xl">{f.title}</h3>
            <p className="text-gray-600 text-lg">{f.desc}</p>
          </div>
        ))}
      </div>

    </section>
  );
}