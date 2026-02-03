import { MessageSquare } from "lucide-react";

export default function SignupNavbar() {
  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <div className="flex items-center gap-2">
          <MessageSquare className="text-blue-600" />
          <span className="font-semibold">TalkFlow AI</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm">
            Already have an account?
          </span>

          <button className="bg-blue-50 text-blue-700 px-4 py-2 rounded-xl">
            Log in
          </button>
        </div>

      </div>
    </nav>
  );
}