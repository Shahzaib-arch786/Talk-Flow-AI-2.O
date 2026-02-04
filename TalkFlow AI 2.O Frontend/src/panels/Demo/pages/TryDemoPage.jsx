import TryNavbar from "../components/TryNavbar";
import DemoForm from "../components/DemoForm";
import TrustedBy from "../components/TrustedBy";

export default function TryDemoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <TryNavbar />

      <div className="py-16 flex justify-center">
        <DemoForm />
      </div>

      <TrustedBy />

      <div className="text-center text-sm text-gray-500 pb-6">
        © 2026 TalkFlow AI Inc. All rights reserved.
      </div>
    </div>
  );
}