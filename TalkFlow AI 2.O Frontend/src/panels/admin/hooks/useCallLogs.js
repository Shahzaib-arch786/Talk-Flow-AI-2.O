import { useEffect, useState } from "react";

const useCallLogs = (page = 1, limit = 10) => {
  const [logs, setLogs] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, [page]);

  const fetchLogs = async () => {
    try {
      const skip = (page - 1) * limit;

      const res = await fetch(
        `http://127.0.0.1:8000/admin/dashboard/call-logs?skip=${skip}&limit=${limit}`
      );

      const data = await res.json();

      
      setLogs(data?.data || []);
      setTotal(data?.total || 0);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return { logs, total, loading };
};

export default useCallLogs;