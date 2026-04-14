// src/pages/admin/AdminCustomers.jsx
import { useEffect, useState, useCallback } from "react";
import { adminAPI } from "../../services/adminAPI";
import {
  FiTrash2,
  FiChevronLeft,
  FiChevronRight,
  FiUser,
} from "react-icons/fi";

const DeleteConfirm = ({ user, onCancel, onConfirm }) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center p-4"
    style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
  >
    <div className="bg-[#1a1a1a] border border-red-900/30 rounded-2xl p-6 max-w-sm w-full text-center">
      <div className="w-12 h-12 bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <FiTrash2 size={20} className="text-red-400" />
      </div>
      <h3 className="text-white font-light mb-2">Remove Customer?</h3>
      <p className="text-gray-500 text-sm mb-6">
        <span className="text-gray-300">
          {user.firstName} {user.lastName}
        </span>{" "}
        and all their data will be deleted.
      </p>
      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 py-2.5 border border-white/10 text-gray-400 hover:text-white rounded-xl text-sm transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={() => onConfirm(user._id)}
          className="flex-1 py-2.5 bg-red-800 hover:bg-red-700 text-white rounded-xl text-sm transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);

const AdminCustomers = () => {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, pages: 1 });
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchUsers = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await adminAPI.getUsers({ page, limit: 20 });
      setUsers(data.users);
      setPagination(data.pagination);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers(1);
  }, [fetchUsers]);

  const handleDelete = async (id) => {
    try {
      await adminAPI.deleteUser(id);
      setDeleteTarget(null);
      fetchUsers(pagination.page);
    } catch (err) {
      console.error(err);
    }
  };

  const initials = (u) =>
    `${u.firstName?.[0] || ""}${u.lastName?.[0] || ""}`.toUpperCase();

  const AVATAR_COLORS = [
    "bg-pink-900/50 text-pink-400",
    "bg-purple-900/50 text-purple-400",
    "bg-blue-900/50 text-blue-400",
    "bg-emerald-900/50 text-emerald-400",
    "bg-amber-900/50 text-amber-400",
  ];

  return (
    <div className="flex flex-col gap-5">
      {deleteTarget && (
        <DeleteConfirm
          user={deleteTarget}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={handleDelete}
        />
      )}

      {/* Header */}
      <div>
        <h2 className="text-white text-lg font-light">Customers</h2>
        <p className="text-gray-600 text-[0.65rem] tracking-widest uppercase">
          {pagination.total} registered
        </p>
      </div>

      {/* Table */}
      <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-pink-600 animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-16 text-gray-700">
            No customers yet
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                {["Customer", "Email", "Phone", "Role", "Joined", ""].map(
                  (h, i) => (
                    <th
                      key={i}
                      className="text-left text-[0.6rem] tracking-[0.2em] uppercase text-gray-600 px-4 py-3"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr
                  key={user._id}
                  className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-[0.65rem] font-medium shrink-0 ${AVATAR_COLORS[idx % AVATAR_COLORS.length]}`}
                      >
                        {initials(user)}
                      </div>
                      <span className="text-sm text-gray-200">
                        {user.firstName} {user.lastName}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {user.phone || "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-[0.6rem] tracking-widest uppercase px-2 py-1 rounded-full border ${
                        user.role === "admin"
                          ? "bg-pink-900/30 border-pink-900/50 text-pink-400"
                          : "bg-white/5 border-white/10 text-gray-500"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[0.7rem] text-gray-600">
                    {new Date(user.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-3">
                    {user.role !== "admin" && (
                      <button
                        onClick={() => setDeleteTarget(user)}
                        className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-700 hover:text-red-400 hover:bg-red-900/10 transition-colors"
                      >
                        <FiTrash2 size={13} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-[0.65rem] text-gray-600">
            Page {pagination.page} of {pagination.pages}
          </p>
          <div className="flex gap-2">
            <button
              disabled={pagination.page <= 1}
              onClick={() => fetchUsers(pagination.page - 1)}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/10 text-gray-500 hover:text-white disabled:opacity-30 transition-colors"
            >
              <FiChevronLeft size={14} />
            </button>
            <button
              disabled={pagination.page >= pagination.pages}
              onClick={() => fetchUsers(pagination.page + 1)}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/10 text-gray-500 hover:text-white disabled:opacity-30 transition-colors"
            >
              <FiChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCustomers;
