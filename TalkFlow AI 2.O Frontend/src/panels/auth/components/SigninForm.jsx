import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
} from "lucide-react";
import usePasswordToggle from "../hooks/usePasswordToggle";
import Button from "../components/Button";
import Input from "../components/Input";
import Checkbox from "../components/Checkbox";
import GoogleButton from "./GoogleButton";
import { useState } from "react";

export default function SigninForm() {
  const password = usePasswordToggle();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const handleSignup = async (fullName, email, password) => {
    try {
      const formData = new URLSearchParams();
      formData.append("full_name", fullName);
      formData.append("email", email);
      formData.append("password", password);

      console.log("Sending:", fullName, email, password);


      const response = await fetch("http://127.0.0.1:8000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        alert(JSON.stringify(data.detail) || "Signup failed");
        return;
      }

      localStorage.setItem("token", data.access_token);
      window.location.href = "/login";
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="w-full max-w-md">
      <h2 className="text-3xl font-bold">Create Business Account</h2>
      <p className="text-gray-500 mt-2">
        Start your 14-day free trial today. No credit card required.
      </p>

      <div className="mt-6">
        <GoogleButton btnColor="bg-pink-800" btnHover="hover:bg-pink-700" />
      </div>

      <div className="my-6 text-center text-sm text-gray-400">OR USE EMAIL</div>

      <div className="space-y-4">
        <Input 
        icon={User} 
        placeholder="Enter Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        />
        <Input icon={Mail}
         placeholder="name@company.com"
         value={email}
         onChange={(e) => setEmail(e.target.value)}
         />

        <div className="relative">
          <Input icon={Lock} 
          placeholder="Password" type={password.type} value={passwordValue} onChange={(e) => setPasswordValue(e.target.value)} />
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

        <Button
          btnColor="bg-pink-800"
          btnHover="hover:bg-pink-700"
          onClick={() =>
            handleSignup(fullName, email, passwordValue)
          }
        >
          Create Account →
        </Button>

        <p className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <span className="text-blue-600 cursor-pointer">
            Login to your business
          </span>
        </p>
      </div>
    </div>
  );
}
