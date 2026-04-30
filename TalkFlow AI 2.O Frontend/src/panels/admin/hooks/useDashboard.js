import { useEffect, useState } from "react";
import { Phone, Shield, Globe, Zap } from "lucide-react";

export const useDashboard = () => {
  const [stats, setStats] = useState([]);
  const [intents, setIntents] = useState([]);
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);
  // ADD THESE STATES
  const [trendData, setTrendData] = useState([]);
  const [intentDistribution, setIntentDistribution] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/admin/dashboard/1");
      const data = await res.json();

      // 🔹 Stats Cards
      setStats([
        {
          title: "Total Calls",
          value: data.total_calls,
          tag: "+12%",
          icon: Phone,
        },
        {
          title: "Avg Confidence",
          value: data.avg_confidence + "%",
          tag: "High",
          icon: Shield,
        },
        {
          title: "Active Languages",
          value: data.active_languages.join(" / "),
          tag: "Global",
          icon: Globe,
        },
        {
          title: "Processing Time",
          value: data.avg_processing_time + "s",
          tag: "-5%",
          icon: Zap,
        },
      ]);

      setTrendData([
        { day: "Mon", inbound: 120, outbound: 40 },
        { day: "Tue", inbound: 200, outbound: 60 },
        { day: "Wed", inbound: 280, outbound: 80 },
        { day: "Thu", inbound: 180, outbound: 70 },
        { day: "Fri", inbound: 240, outbound: 90 },
        { day: "Sat", inbound: 90, outbound: 30 },
        { day: "Sun", inbound: 60, outbound: 20 },
      ]);

      setIntentDistribution(
        data.top_intents.map((i) => ({
          name: i.intent,
          value: i.percentage,
        })),
      );

      // 🔹 Intents
      setIntents(
        data.top_intents.map((i) => ({
          name: i.intent,
          percent: i.percentage,
        })),
      );

      // 🔹 Calls
      setCalls(
        data.recent_calls.map((c) => ({
          time: c.time,
          lang: c.language,
          intent: c.intent,
          confidence: c.confidence,
        })),
      );
    } catch (error) {
      console.error("Dashboard error:", error);
    } finally {
      setLoading(false);
    }
  };

  return { stats, intents, calls, loading, trendData, intentDistribution };
};
