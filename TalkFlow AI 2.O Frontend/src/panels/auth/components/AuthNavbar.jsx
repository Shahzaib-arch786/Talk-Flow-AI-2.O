import { MessageSquare } from "lucide-react";

export default function AuthNavbar() {
  return (
    <nav className="bg-white border-b">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <MessageSquare className="text-blue-600" />
          <span className="font-semibold">TalkFlow AI</span>
        </div>

        <p className="text-blue-600 cursor-pointer">
          Support
        </p>
      </div>
    </nav>
  );
}