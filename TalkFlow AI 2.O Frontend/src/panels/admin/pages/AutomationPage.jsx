import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  Trash2,
  Pencil,
  Eye,
  Zap,
  Clock3,
  ListChecks,
} from "lucide-react";

export default function AutomationPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [actions, setActions] = useState([]);
  const [requests, setRequests] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [actionName, setActionName] = useState("");
  const [description, setDescription] = useState("");

  const token = localStorage.getItem("token");

  const [businessId, setBusinessId] = useState(null);

  const fetchActiveBusiness = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/admin/business/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const businesses = await res.json();

      const active = businesses.find((b) => b.is_active);

      if (active) {
        setBusinessId(active.id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchActiveBusiness();
  }, []);

  useEffect(() => {
    if (businessId) {
      fetchActions();
      fetchRequests();
    }
  }, [businessId]);

  //-----------------------------------
  // FETCH ACTIONS
  //-----------------------------------
  const fetchActions = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/actions/${businessId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setActions(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log(err);
    }
  };

  //-----------------------------------
  // FETCH REQUESTS
  //-----------------------------------
  const fetchRequests = async () => {
  try {
    const res = await fetch(
      `http://127.0.0.1:8000/actions/requests/${businessId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();
    setRequests(Array.isArray(data) ? data : []);
  } catch (err) {
    console.log(err);
  }
};

  //-----------------------------------
  // CREATE ACTION
  //-----------------------------------
  const createAction = async () => {
    try {
      await fetch("http://127.0.0.1:8000/actions/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          business_id: businessId,
          action_name: actionName,
          description,
        }),
      });

      setShowModal(false);
      setActionName("");
      setDescription("");

      fetchActions();
    } catch (err) {
      console.log(err);
    }
  };

  //-----------------------------------
  // DELETE ACTION
  //-----------------------------------
  const deleteAction = async (id) => {
    try {
      await fetch(`http://127.0.0.1:8000/actions/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchActions();
    } catch (err) {
      console.log(err);
    }
  };

  const pendingRequests = requests.filter((r) => r.status === "pending").length;
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />

        <div className="p-4 md:p-6 space-y-6">
          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Action Automation</h1>

              <p className="text-gray-500 mt-1">
                Configure business actions your AI can detect automatically.
              </p>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl flex items-center gap-2"
            >
              <Plus size={18} />
              Create Action
            </button>
            <button
              onClick={() => navigate("/admin/test-ai")}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-5 py-3 rounded-xl flex items-center gap-2"
            >
              <Plus size={18} />
              Test Action 
            </button>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <StatCard
              icon={<Zap />}
              title="Active Actions"
              value={actions.length}
            />

            <StatCard
              icon={<ListChecks />}
              title="Total Requests"
              value={requests.length}
            />

            <StatCard
              icon={<Clock3 />}
              title="Pending Requests"
              value={pendingRequests}
            />
          </div>

          {/* ACTIONS */}
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-5">
              <h2 className="text-xl font-semibold">Configured Actions</h2>

              <div className="flex items-center gap-2 border rounded-xl px-3 py-2">
                <Search size={18} />
                <input
                  placeholder="Search actions..."
                  className="outline-none"
                />
              </div>
            </div>

            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-500 text-sm">
                    <th>Action</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {actions.map((item) => (
                    <tr key={item.id} className="border-t">
                      <td className="py-4 font-medium">{item.action_name}</td>

                      <td>{item.description}</td>

                      <td>
                        <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                          Active
                        </span>
                      </td>

                      <td>
                        <button
                          onClick={() => deleteAction(item.id)}
                          className="text-red-500"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-4">
              {actions.map((item) => (
                <div key={item.id} className="border rounded-xl p-4">
                  <h3 className="font-semibold">{item.action_name}</h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {item.description}
                  </p>

                  <div className="mt-3 flex justify-between">
                    <span className="text-green-600 text-sm">Active</span>

                    <button
                      onClick={() => deleteAction(item.id)}
                      className="text-red-500"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* REQUESTS */}
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <h2 className="text-xl font-semibold mb-5">
              Recent Action Requests
            </h2>

            <div className="space-y-4">
              {requests.map((req) => (
                <div
                  key={req.id}
                  className="border rounded-xl p-4 flex flex-col md:flex-row justify-between gap-4"
                >
                  <div>
                    <p className="font-medium">{req.customer_query}</p>

                    <p className="text-sm text-gray-500 mt-1">
                      Action: {req.action_name}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                      {req.status}
                    </span>

                    <button>
                      <Eye size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CREATE MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center p-4 z-50">
          <div className="bg-white w-full max-w-md rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4">Create Action</h2>

            <input
              value={actionName}
              onChange={(e) => setActionName(e.target.value)}
              placeholder="Action Name"
              className="w-full border rounded-xl p-3 mb-4"
            />

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="w-full border rounded-xl p-3 mb-4"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded-xl"
              >
                Cancel
              </button>

              <button
                onClick={createAction}
                className="bg-blue-600 text-white px-5 py-2 rounded-xl"
              >
                Save Action
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5">
      <div className="text-blue-600 mb-4">{icon}</div>

      <p className="text-gray-500 text-sm">{title}</p>

      <h2 className="text-3xl font-bold mt-2">{value}</h2>
    </div>
  );
}
