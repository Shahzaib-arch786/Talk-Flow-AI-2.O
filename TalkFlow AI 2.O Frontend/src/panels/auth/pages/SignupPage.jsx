import AuthLayout from "../components/AuthLayout"
import AuthHero from "../components/AuthHero"
import SigninForm from "../components/SigninForm"

export default function Signup() {
  return (
    <AuthLayout>
      <AuthHero
        gradientFrom="#7e22ce" // purple-700
        gradientTo="#831843"   // pink-900
      />
      <div className="flex items-center justify-center px-6">
        <SigninForm />
      </div>
    </AuthLayout>
  )
}
