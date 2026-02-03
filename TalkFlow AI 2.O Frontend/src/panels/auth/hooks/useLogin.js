import { useState } from "react";

export default function useLogin() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Login:", form);
    // connect with backend later
  };

  const googleLogin = () => {
    console.log("Google Login");
  };

  return {
    form,
    handleChange,
    handleSubmit,
    googleLogin,
  };
}