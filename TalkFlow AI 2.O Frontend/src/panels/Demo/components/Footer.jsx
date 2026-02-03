import { MessageSquare } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">

        <div>
          <div className="flex items-center gap-2">
            <MessageSquare />
            <span className="font-semibold">TalkFlow AI</span>
          </div>

          <p className="text-sm text-gray-600 mt-3">
            Final Year Project exploring human-AI conversation.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Resources</h4>
          <p className="text-sm">Documentation</p>
          <p className="text-sm">API Reference</p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Connect</h4>
          <p className="text-sm">GitHub</p>
          <p className="text-sm">LinkedIn</p>
        </div>

      </div>
    </footer>
  );
}