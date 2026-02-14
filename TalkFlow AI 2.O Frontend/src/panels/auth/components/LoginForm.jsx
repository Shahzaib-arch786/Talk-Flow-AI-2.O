import { Mail, Lock, Eye, EyeOff } from "lucide-react"
import usePasswordToggle from "../hooks/usePasswordToggle"
import Button from "../components/Button"
import Input from "../components/Input"
import Checkbox from "../components/Checkbox"
import GoogleButton from "./GoogleButton"
import { useState } from "react"

export default function LoginForm() {
  const password = usePasswordToggle()
  const [email, setEmail] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const handleLogin = async (email, password) => {
  try {
    const formData = new URLSearchParams();
    formData.append("username", email);
    formData.append("password", password);

    console.log("Sending:", email, password);

    const response = await fetch("http://127.0.0.1:8000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      alert(JSON.stringify(data.detail) || "Login failed");
      return;
    }

    // Save token
    localStorage.setItem("token", data.access_token);

    // Redirect after login
    window.location.href = "/admin/dashboard"; // change according to your route
  } catch (error) {
    console.error("Login error:", error);
  }
};


  return (
    <div className="w-full max-w-md">
      <h2 className="text-3xl font-bold">Welcome Back</h2>
      <p className="text-gray-500 mt-2">
        Enter your business credentials to access your dashboard.
      </p>

      <div className="mt-6">
        <GoogleButton btnColor="bg-blue-600" btnHover="hover:bg-blue-700" />
      </div>

      <div className="my-6 text-center text-sm text-gray-400">
        OR USE EMAIL
      </div>

      <div className="space-y-4">
        <Input icon={Mail} placeholder="name@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        
        <div className="relative">
          <Input
            icon={Lock}
            placeholder="Password"
            type={password.type}
            value={passwordValue}
            onChange={(e) => setPasswordValue(e.target.value)}
          />
          <button
            onClick={password.toggle}
            className="absolute right-4 top-2.5 text-gray-400"
          >
            {password.visible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <div className="flex items-center justify-between">
          <Checkbox label="Remember this device for 30 days" />
          <a className="text-sm text-blue-600 hover:underline">
            Forgot password?
          </a>
        </div>

        <Button onClick={() => handleLogin(email, passwordValue)}>
          Login to Dashboard →
        </Button>

        <p className="text-sm text-center text-gray-500">
          Don’t have an account?{" "}
          <span className="text-blue-600 cursor-pointer">
            Register your business
          </span>
        </p>
      </div>
    </div>
  )
}
