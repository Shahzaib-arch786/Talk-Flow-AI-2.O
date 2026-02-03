import { Clock, Activity, User, Target } from "lucide-react";

const features = [
  {
    icon: Activity,
    title: "Real-time Understanding",
    desc: "Processes audio instantly with sub-200ms delay."
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
    <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-8">

      <div>
        <span className="text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
          FEATURES
        </span>

        <h2 className="text-3xl font-bold mt-4">
          Engineered for Excellence
        </h2>

        <p className="text-gray-600 mt-3">
          State-of-the-art models for mission critical operations.
        </p>
      </div>

      <div className="md:col-span-2 grid md:grid-cols-2 gap-6">
        {features.map((f, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border">
            <f.icon className="text-blue-600 mb-3" />
            <h3 className="font-semibold">{f.title}</h3>
            <p className="text-gray-600 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>

    </section>
  );
}