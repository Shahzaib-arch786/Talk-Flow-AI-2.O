export default function Pagination({ page, setPage, total, limit }) {
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 text-sm text-gray-600">
      
      <span>
        Showing {(page - 1) * limit + 1} to{" "}
        {Math.min(page * limit, total)} of {total} entries
      </span>

      <div className="flex items-center gap-2">
        {[...Array(totalPages)].map((_, i) => (
          <Page
            key={i}
            active={page === i + 1}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </Page>
        ))}
      </div>
    </div>
  );
}

function Page({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-9 h-9 rounded-full ${
        active
          ? "bg-blue-600 text-white"
          : "hover:bg-gray-100"
      }`}
    >
      {children}
    </button>
  );
}