import { useState } from "react";

export default function useDemoForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    language: "English",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const setLanguage = (lang) => {
    setForm({ ...form, language: lang });
  };

  const handleSubmit = () => {
    console.log("Demo Form Data:", form);
    // later connect with backend / call flow
  };

  return {
    form,
    handleChange,
    setLanguage,
    handleSubmit,
  };
}