import { Codesandbox } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">

        <div>
          <div className="flex items-center gap-2">
            <Codesandbox className="text-blue-700 w-6 h-6" />
            <span className="font-bold text-2xl">TalkFlow AI</span>
          </div>

          <p className="text-sm text-gray-600 mt-3">
            Final Year Project: Exploring the boundaries of human-Computer interaction through neural speech synthetic conversation. 
          </p>
        </div>

        <div className="">
          <h4 className="font-semibold mb-3 text-gray-400 uppercase">Resources</h4>
          <p className="text-sm">Documentation</p>
          <p className="text-sm">API Reference</p>
          <p className="text-sm">Research Paper</p>
        </div>

        <div className="">
          <h4 className="font-semibold mb-3 text-gray-400 uppercase">Connect</h4>
          <p className="text-sm">GitHub</p>
          <p className="text-sm">LinkedIn</p>
          <p className="text-sm">Twitter</p>
        </div>

      </div>
      <div className="bg-gray-50 text-center text-sm text-gray-500 py-4 gap-10 flex justify-center items-center border-t border-gray-200">
        &copy; 2026 TalkFlow AI. All rights reserved. <br />
        Privacy Policy · Terms of Service
      </div>
    </footer>
  );
}