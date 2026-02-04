export default function Pagination() {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 text-sm text-gray-600">
      <span>Showing 1 to 10 of 250 entries</span>

      <div className="flex items-center gap-2">
        <Page active>1</Page>
        <Page>2</Page>
        <Page>3</Page>
        <span>...</span>
        <Page>25</Page>
      </div>
    </div>
  );
}

function Page({ children, active }) {
  return (
    <button
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
