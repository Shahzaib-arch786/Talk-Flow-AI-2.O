export default function Input({ icon: Icon, ...props }) {
  return (
    <div className="flex items-center gap-3 border rounded-lg px-4 py-2 focus-within:ring-2 ring-blue-500">
      {Icon && <Icon className="w-5 h-5 text-gray-400" />}
      <input
        className="w-full outline-none text-sm"
        {...props}
      />
    </div>
  )
}
