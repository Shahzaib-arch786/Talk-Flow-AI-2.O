import { LayoutDashboard, BarChart2, Mic, Settings } from "lucide-react";

export default function Sidebar() {
  const items = [
    { name: "Dashboard", icon: LayoutDashboard, active: true },
    { name: "AI Knowledge", icon: BarChart2 },
    { name: "Call Logs", icon: Mic },
    { name: "Settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-900 p-4 hidden md:block">
      <div className="flex items-center gap-2 mb-8">
        <div className="bg-blue-600 p-2 rounded-xl text-white">
          <LayoutDashboard />
        </div>
        <div>
          <h2 className="font-bold">TalkFlow AI</h2>
          <p className="text-xs text-gray-500">Business Admin</p>
        </div>
      </div>

      <nav className="space-y-2">
        {items.map((i) => (
          <div
            key={i.name}
            className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer ${
              i.active
                ? "bg-blue-50 text-blue-700"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            <i.icon size={18} />
            <span>{i.name}</span>
          </div>
        ))}
      </nav>
    </aside>
  );
}
