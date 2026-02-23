import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useDemoForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    language: "English",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setError(""); // clear error while typing
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Basic email validation
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async () => {
    if (loading) return;

    const name = form.name.trim();
    const email = form.email.trim();

    // Required fields check
    if (!name || !email) {
      setError("Please complete all required fields.");
      return;
    }

    // Email format check
    if (!isValidEmail(email)) {
      setError("Please enter a valid business email address.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch("http://127.0.0.1:8000/demo/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: name,
          email: email,
        }),
      });

      // Safely parse JSON
      let data = {};
      try {
        data = await response.json();
      } catch {
        data = {};
      }

      // Handle backend validation error
      if (!response.ok) {
        setError(
          data?.detail ||
            "A demo session is already active for this email."
        );
        return;
      }

      // Success
      if (data?.session_id) {
        localStorage.setItem("demo_session_id", data.session_id);
        navigate("/demo/live");
      } else {
        setError("Unexpected server response. Please try again.");
      }

    } catch (err) {
      setError("Unable to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    handleChange,
    handleSubmit,
    loading,
    error,
    setError,
  };
}