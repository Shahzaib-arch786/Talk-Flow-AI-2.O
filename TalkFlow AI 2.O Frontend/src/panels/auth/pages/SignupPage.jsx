import SignupNavbar from "../components/SignupNavbar";
import SignupCard from "../components/SignupCard";
import BenefitsSection from "../components/BenefitsSection";
import TrustedLogos from "../components/TrustedLogos";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SignupNavbar />

      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-10 items-center">
        <BenefitsSection />
        <SignupCard />
      </div>

      <TrustedLogos />
    </div>
  );
}