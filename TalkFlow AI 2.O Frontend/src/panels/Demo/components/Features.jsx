import { Clock, Activity, User, Target } from "lucide-react";

const features = [
  {
    icon: Activity,
    title: "Real-time Understanding",
    desc: "Processes audio instantly with sub-200ms delay.",
  },
  {
    icon: Target,
    title: "Intent Detection",
    desc: "95% precision using fine-tuned models.",
  },
  {
    icon: User,
    title: "Human-like Voice",
    desc: "Natural neural voices with prosody control.",
  },
  {
    icon: Clock,
    title: "Low Latency",
    desc: "Optimized pipeline for fluid interaction.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 grid gap-10 md:grid-cols-3"
    >
      {/* Left content */}
      <div>
        <span className="inline-block text-xs sm:text-sm text-white font-bold bg-blue-700 px-3 py-1 rounded-full">
          FEATURES
        </span>

        <h2 className="mt-4 font-bold leading-tight text-2xl sm:text-3xl lg:text-4xl">
          Engineered for Excellence
        </h2>

        <p className="text-gray-600 mt-3 text-sm sm:text-base max-w-md">
          State-of-the-art models for mission-critical operations. Our platform
          leverages advanced AI to deliver unparalleled speech recognition and
          synthesis performance.
        </p>
      </div>

      {/* Feature cards */}
      <div className="md:col-span-2 grid gap-6 sm:grid-cols-2">
        {features.map((f, i) => (
          <div
            key={i}
            className="bg-white p-6 sm:p-8 rounded-xl border flex flex-col items-center text-center hover:shadow-md transition"
          >
            <f.icon className="text-blue-700 mb-3 w-8 h-8" />

            <h3 className="font-bold text-lg sm:text-xl">
              {f.title}
            </h3>

            <p className="text-gray-600 text-sm sm:text-base mt-2">
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
