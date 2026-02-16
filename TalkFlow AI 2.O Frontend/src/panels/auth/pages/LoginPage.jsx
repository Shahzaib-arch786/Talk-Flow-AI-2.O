import AuthLayout from "../components/AuthLayout"
import AuthHero from "../components/AuthHero"
import LoginForm from "../components/LoginForm"

export default function Login() {
  return (
    <AuthLayout>
      <AuthHero
        gradientFrom="#1d4ed8" // blue-700
        gradientTo="#312e81"   // indigo-900
      />
      <div className="flex items-center justify-center px-6">
        <LoginForm />
      </div>
    </AuthLayout>
  )
}


// done 