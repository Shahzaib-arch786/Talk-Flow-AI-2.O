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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const setLanguage = (lang) => {
    setForm({ ...form, language: lang });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://127.0.0.1:8000/demo/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: form.name,
          email: form.email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.detail || "Something went wrong");
        return;
      }

      localStorage.setItem("demo_session_id", data.session_id);

     navigate("/demo/live");
     
    } catch (error) {
      console.error("Server error:", error);
      alert("Cannot connect to backend");
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    handleChange,
    setLanguage,
    handleSubmit,
    
  };
}
