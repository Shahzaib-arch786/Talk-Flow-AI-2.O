import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Pipeline from "../components/PipeLine";
import Features from "../components/Features";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <Hero />
      <Pipeline />
      <Features />
      <CTA />
      <Footer />
    </div>
  );
}