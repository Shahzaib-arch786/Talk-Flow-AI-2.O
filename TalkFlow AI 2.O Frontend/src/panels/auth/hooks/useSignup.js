import { useState } from "react";

export default function useSignup() {
  const [form, setForm] = useState({
    business: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = () => {
    console.log("Signup:", form);
  };

  return { form, handleChange, submit };
}

