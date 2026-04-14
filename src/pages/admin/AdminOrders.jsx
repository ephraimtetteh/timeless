// src/pages/admin/AdminOrders.jsx
import { useEffect, useState, useCallback } from "react";
import { adminAPI } from "../../services/adminAPI";
import {
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
  FiRefreshCw,
} from "react-icons/fi";

const STATUSES = [
  "all",
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

const STATUS_STYLES = {
  pending: "bg-yellow-900/30 text-yellow-400 border-yellow-900/50",
  processing: "bg-blue-900/30 text-blue-400 border-blue-900/50",
  shipped: "bg-purple-900/30 text-purple-400 border-purple-900/50",
  delivered: "bg-emerald-900/30 text-emerald-400 border-emerald-900/50",
  cancelled: "bg-red-900/30 text-red-400 border-red-900/50",
  paid: "bg-emerald-900/30 text-emerald-400 border-emerald-900/50",
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, pages: 1 });
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null); // orderId being updated
  const [expanded, setExpanded] = useState(null);

  const fetchOrders = useCallback(
    async (page = 1) => {
      setLoading(true);
      try {
        const { data } = await adminAPI.getOrders({
          status: statusFilter === "all" ? undefined : statusFilter,
          page,
          limit: 15,
        });
        setOrders(data.orders);
        setPagination(data.pagination);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [statusFilter],
  );

  useEffect(() => {
    fetchOrders(1);
  }, [fetchOrders]);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdating(orderId);
    try {
      const { data } = await adminAPI.updateOrderStatus(orderId, newStatus);
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? data.order : o)),
      );
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(null);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white text-lg font-light">Orders</h2>
          <p className="text-gray-600 text-[0.65rem] tracking-widest uppercase">
            {pagination.total} total
          </p>
        </div>
        <button
          onClick={() => fetchOrders(pagination.page)}
          className="flex items-center gap-2 text-[0.7rem] text-gray-500 hover:text-white border border-white/10 px-3 py-1.5 rounded-full transition-colors"
        >
          <FiRefreshCw size={12} /> Refresh
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`text-[0.65rem] tracking-widest uppercase px-3 py-1.5 rounded-full border transition-all ${
              statusFilter === s
                ? "bg-pink-900/40 border-pink-800 text-pink-400"
                : "border-white/10 text-gray-500 hover:text-gray-300"
            }`}
          >
            {s}
          </button>
        ))}
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
        ) : orders.length === 0 ? (
          <div className="text-center py-16 text-gray-700">No orders found</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                {[
                  "Order ID",
                  "Customer",
                  "Items",
                  "Total",
                  "Status",
                  "Date",
                  "Action",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left text-[0.6rem] tracking-[0.2em] uppercase text-gray-600 px-4 py-3"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <>
                  <tr
                    key={order._id}
                    onClick={() =>
                      setExpanded(expanded === order._id ? null : order._id)
                    }
                    className="border-b border-white/5 hover:bg-white/[0.02] cursor-pointer transition-colors"
                  >
                    <td className="px-4 py-3">
                      <span className="font-mono text-[0.65rem] text-gray-400">
                        #{order._id.slice(-8).toUpperCase()}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-gray-200">
                        {order.user?.firstName} {order.user?.lastName}
                      </p>
                      <p className="text-[0.65rem] text-gray-600 truncate max-w-[140px]">
                        {order.user?.email}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-400">
                      {order.items?.length} item
                      {order.items?.length !== 1 ? "s" : ""}
                    </td>
                    <td className="px-4 py-3 text-sm text-white font-medium">
                      GH₵ {order.total?.toFixed(2)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-[0.6rem] tracking-widest uppercase px-2 py-1 rounded-full border ${STATUS_STYLES[order.status] || ""}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[0.7rem] text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "2-digit",
                      })}
                    </td>
                    <td
                      className="px-4 py-3"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <select
                        value={order.status}
                        disabled={updating === order._id}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                        className="bg-[#252525] border border-white/10 text-gray-300 text-[0.7rem] rounded-lg px-2 py-1 focus:outline-none focus:border-pink-700 disabled:opacity-50 cursor-pointer"
                      >
                        {STATUSES.filter((s) => s !== "all").map((s) => (
                          <option key={s} value={s}>
                            {s.charAt(0).toUpperCase() + s.slice(1)}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>

                  {/* Expanded row — order items */}
                  {expanded === order._id && (
                    <tr key={`${order._id}-exp`} className="bg-[#141414]">
                      <td colSpan={7} className="px-6 py-4">
                        <div className="grid sm:grid-cols-2 gap-6">
                          {/* Items */}
                          <div>
                            <p className="text-[0.6rem] tracking-widest uppercase text-gray-600 mb-3">
                              Items
                            </p>
                            <div className="flex flex-col gap-2">
                              {order.items?.map((item, i) => (
                                <div
                                  key={i}
                                  className="flex justify-between text-sm"
                                >
                                  <span className="text-gray-400">
                                    {item.title} × {item.amount}
                                  </span>
                                  <span className="text-gray-300">
                                    GH₵ {(item.price * item.amount).toFixed(2)}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                          {/* Delivery */}
                          <div>
                            <p className="text-[0.6rem] tracking-widest uppercase text-gray-600 mb-3">
                              Delivery Address
                            </p>
                            <p className="text-sm text-gray-400 leading-relaxed">
                              {order.deliveryAddress?.street}
                              <br />
                              {order.deliveryAddress?.city},{" "}
                              {order.deliveryAddress?.state}
                              <br />
                              {order.deliveryAddress?.country}
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
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
              onClick={() => fetchOrders(pagination.page - 1)}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/10 text-gray-500 hover:text-white disabled:opacity-30 transition-colors"
            >
              <FiChevronLeft size={14} />
            </button>
            <button
              disabled={pagination.page >= pagination.pages}
              onClick={() => fetchOrders(pagination.page + 1)}
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

export default AdminOrders;
