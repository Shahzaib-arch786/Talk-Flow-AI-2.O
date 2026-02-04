import { ChevronDown, Globe, Filter } from "lucide-react";

export default function Filters() {
  return (
    <div className="flex flex-wrap gap-3">

      <FilterButton icon={Globe} label="All Languages" />
      <FilterButton label="English" />
      <FilterButton label="Urdu" />
      <FilterButton icon={Filter} label="All Intents" />

    </div>
  );
}

function FilterButton({ icon: Icon, label }) {
  return (
    <button className="flex items-center gap-2 bg-white border border-gray-300 shadow-sm px-4 py-2 rounded-lg text-sm hover:bg-gray-50">
      {Icon && <Icon size={16} />}
      {label}
      <ChevronDown size={14} />
    </button>
  );
}
