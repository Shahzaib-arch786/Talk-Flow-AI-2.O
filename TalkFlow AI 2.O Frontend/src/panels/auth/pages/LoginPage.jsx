import AuthNavbar from "../components/AuthNavbar";
import AuthFooter from "../components/AuthFooter";
import LoginCard from "../components/LoginCard";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AuthNavbar />

      <div className="flex justify-center py-12 px-4">
        <LoginCard />
      </div>

      <AuthFooter />
    </div>
  );
}