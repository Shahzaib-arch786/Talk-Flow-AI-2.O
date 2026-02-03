import { Phone, Shield, Globe, Zap } from "lucide-react";

export const useDashboard = () => {
  const stats = [
    {
      title: "Total Calls",
      value: "12,482",
      tag: "+12%",
      icon: Phone,
    },
    {
      title: "Avg Confidence",
      value: "94.2%",
      tag: "High",
      icon: Shield,
    },
    {
      title: "Active Languages",
      value: "EN / UR",
      tag: "Global",
      icon: Globe,
    },
    {
      title: "Processing Time",
      value: "1.2s",
      tag: "-5%",
      icon: Zap,
    },
  ];

  const intents = [
    { name: "Support", percent: 60 },
    { name: "Billing", percent: 90 },
    { name: "Inquiry", percent: 70 },
    { name: "Technical", percent: 60 },
    { name: "Sales", percent: 40 },
  ];

  const calls = [
    {
      time: "2 mins ago",
      lang: "English",
      intent: "Support Request",
      confidence: 98.2,
    },
    {
      time: "15 mins ago",
      lang: "Urdu",
      intent: "Billing Inquiry",
      confidence: 95.1,
    },
  ];

  return { stats, intents, calls };
};