export default function Checkbox({ label }) {
  return (
    <label className="flex items-center gap-2 text-sm text-gray-600">
      <input type="checkbox" className="rounded border-gray-300" />
      {label}
    </label>
  )
}
