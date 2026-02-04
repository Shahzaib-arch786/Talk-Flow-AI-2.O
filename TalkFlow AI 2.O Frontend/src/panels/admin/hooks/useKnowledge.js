import { useEffect, useState } from "react";

export default function useKnowledge() {
  const [status, setStatus] = useState("Active & Live");
  const [lastUpdated, setLastUpdated] = useState(null);
  const [uploads, setUploads] = useState([]);

  useEffect(() => {
    // 🔌 Replace with API later
    setLastUpdated("Oct 24, 2023, 11:45 AM");

    setUploads([
      {
        name: "customer_support_v2.yaml",
        date: "Oct 24, 2023 11:45 AM",
        size: "45.2 KB",
        status: "Success",
      },
      {
        name: "billing_intents_draft.yaml",
        date: "Oct 22, 2023 09:12 AM",
        size: "12.8 KB",
        status: "Success",
      },
      {
        name: "onboarding_flow_v1.yaml",
        date: "Oct 15, 2023 16:30 PM",
        size: "102.4 KB",
        status: "Success",
      },
    ]);
  }, []);

  return {
    status,
    lastUpdated,
    uploads,
  };
}
