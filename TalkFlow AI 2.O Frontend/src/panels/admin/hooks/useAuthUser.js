import { useEffect, useState } from "react";

export default function useAuthUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 🔌 Replace this with real API later
    const fetchUser = async () => {
      try {
        // Example future API call:
        // const res = await fetch("/api/auth/me", { credentials: "include" });
        // const data = await res.json();

        // TEMP mock data
        const data = {
          name: "Sarah Jenkins",
          role: "System Admin",
          avatar: "https://i.pravatar.cc/100",
        };

        setUser(data);
      } catch (err) {
        setError("Failed to load user");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
}
