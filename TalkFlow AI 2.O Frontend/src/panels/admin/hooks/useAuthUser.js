import { useEffect, useState } from "react";

export default function useAuthUser() {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("No token found");
        }

        const response = await fetch("http://127.0.0.1:8000/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Unauthorized");
        }

        const data = await response.json();

        setAdmin({
          ...data,
          avatar: "https://i.pravatar.cc/100",
        });

      } catch (err) {
        console.error(err);
        setError(err.message);

        // Optional: auto logout if token invalid
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { admin, loading, error };
}
