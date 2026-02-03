export default function Button({ children, className = "", btnColor = "bg-blue-600", btnHover = "hover:bg-blue-700", ...props }) {
  return (
    <button
      className={`w-full flex items-center justify-center gap-2 ${btnColor} ${btnHover} text-white font-medium py-2.5 rounded-lg transition ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
