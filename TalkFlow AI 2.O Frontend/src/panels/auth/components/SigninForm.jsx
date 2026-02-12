import { useState } from "react"
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react"
import usePasswordToggle from "../hooks/usePasswordToggle"
import Button from "../components/Button"
import Input from "../components/Input"
import Checkbox from "../components/Checkbox"
import GoogleButton from "./GoogleButton"

export default function LoginForm() {
  const password = usePasswordToggle()

  // ===== State for backend connection =====
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [passwordValue, setPasswordValue] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // ===== Form submit handler =====
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const res = await fetch("http://127.0.0.1:8000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: fullName,
          email: email,
          password: passwordValue,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.detail || "Something went wrong")
      } else {
        setSuccess("Account created successfully!")
        setFullName("")
        setEmail("")
        setPasswordValue("")
      }
    } catch (err) {
      setError("Server error. Try again later.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      <h2 className="text-3xl font-bold">Create Business Account</h2>
      <p className="text-gray-500 mt-2">
        Start your 14-day free trial today. No credit card required.
      </p>

      <div className="mt-6">
        <GoogleButton btnColor="bg-pink-800" btnHover="hover:bg-pink-700" />
      </div>

      <div className="my-6 text-center text-sm text-gray-400">
        OR USE EMAIL
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          icon={User}
          placeholder="Enter Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <Input
          icon={Mail}
          placeholder="name@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="relative">
          <Input
            icon={Lock}
            placeholder="Password"
            type={password.type}
            value={passwordValue}
            onChange={(e) => setPasswordValue(e.target.value)}
          />
          <button
            type="button"
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
          type="submit"
          btnColor="bg-pink-800"
          btnHover="hover:bg-pink-700"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Account →"}
        </Button>

        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-500 mt-2">{success}</p>}

        <p className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <span className="text-blue-600 cursor-pointer">
            Login to your business
          </span>
        </p>
      </form>
    </div>
  )
}
