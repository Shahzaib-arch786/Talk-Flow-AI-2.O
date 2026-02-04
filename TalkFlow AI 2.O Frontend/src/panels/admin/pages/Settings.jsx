import AdminLayout from "../layout/AdminLayout";
import Sidebar from "../components/Sidebar";
import ConfidenceSlider from "../components/ConfidenceSlider";
import ToggleRow from "../components/ToggleRow";
import LanguageSelector from "../components/LanguageSelector";
import FallbackMessage from "../components/FallbackMessage";

export default function Settings() {
  return (
    <AdminLayout>
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">

        {/* Main Content */}
        <div className="space-y-8">
          <div>
            <h1 className="text-2xl font-bold">AI Configuration Settings</h1>
            <p className="text-gray-600 mt-1">
              Fine-tune how TalkFlow AI interacts with your customers.
            </p>
          </div>

          <ConfidenceSlider />
          <ToggleRow />
          <LanguageSelector />
          <FallbackMessage />

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <button className="px-5 py-2 rounded-lg border border-gray-400 hover:bg-gray-100">
              Reset to Defaults
            </button>
            <button className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
              Save Settings
            </button>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
