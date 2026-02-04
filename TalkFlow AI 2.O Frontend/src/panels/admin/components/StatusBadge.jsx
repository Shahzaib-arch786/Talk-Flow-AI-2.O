export default function StatusBadge({ status }) {
  const styles = {
    success: "bg-green-100 text-green-700",
    completed: "bg-blue-100 text-blue-700",
    flagged: "bg-yellow-100 text-yellow-700",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs ${styles[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
