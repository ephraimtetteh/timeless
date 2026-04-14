// src/pages/admin/AdminOverview.jsx
import { useEffect, useState } from "react";
import { adminAPI } from "../../services/adminAPI";
import {
  FiTrendingUp,
  FiShoppingBag,
  FiUsers,
  FiClock,
  FiArrowUpRight,
  FiArrowDownRight,
} from "react-icons/fi";

// ── Tiny bar sparkline ────────────────────────────────────
const Sparkline = ({ data, color = "#f43f5e" }) => {
  if (!data?.length) return null;
  const max = Math.max(...data.map((d) => d.revenue), 1);
  return (
    <div className="flex items-end gap-[2px] h-10">
      {data.slice(-14).map((d, i) => (
        <div
          key={i}
          style={{
            height: `${Math.max(4, (d.revenue / max) * 40)}px`,
            background: color,
          }}
          className="flex-1 rounded-sm opacity-70"
        />
      ))}
    </div>
  );
};

// ── KPI card ─────────────────────────────────────────────
const KpiCard = ({ label, value, sub, growth, Icon, accent }) => {
  const positive = growth >= 0;
  return (
    <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-[0.65rem] tracking-[0.2em] uppercase text-gray-500">
          {label}
        </p>
        <div
          className={`w-8 h-8 rounded-xl flex items-center justify-center`}
          style={{ background: accent + "22" }}
        >
          <Icon size={14} style={{ color: accent }} />
        </div>
      </div>
      <p className="text-2xl font-light text-white">{value}</p>
      <div className="flex items-center gap-2">
        {growth !== undefined && (
          <span
            className={`flex items-center gap-1 text-[0.65rem] font-medium ${positive ? "text-emerald-400" : "text-red-400"}`}
          >
            {positive ? (
              <FiArrowUpRight size={11} />
            ) : (
              <FiArrowDownRight size={11} />
            )}
            {Math.abs(growth)}%
          </span>
        )}
        {sub && <span className="text-[0.65rem] text-gray-600">{sub}</span>}
      </div>
    </div>
  );
};

// ── Status badge ─────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const map = {
    pending: "bg-yellow-900/40 text-yellow-400",
    processing: "bg-blue-900/40 text-blue-400",
    shipped: "bg-purple-900/40 text-purple-400",
    delivered: "bg-emerald-900/40 text-emerald-400",
    cancelled: "bg-red-900/40 text-red-400",
    paid: "bg-emerald-900/40 text-emerald-400",
  };
  return (
    <span
      className={`text-[0.6rem] tracking-widest uppercase px-2 py-1 rounded-full ${map[status] || "bg-gray-800 text-gray-400"}`}
    >
      {status}
    </span>
  );
};

const AdminOverview = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminAPI
      .getAnalytics()
      .then((res) => setData(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
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
    );

  const { kpis, revenueByDay, ordersByStatus, topProducts, recentOrders } =
    data || {};

  const statusMap = {};
  ordersByStatus?.forEach((s) => {
    statusMap[s._id] = s.count;
  });

  return (
    <div className="flex flex-col gap-6">
      {/* KPI row */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <KpiCard
          label="Total Revenue"
          Icon={FiTrendingUp}
          accent="#f43f5e"
          value={`GH₵ ${(kpis?.totalRevenue || 0).toLocaleString("en-GH", { minimumFractionDigits: 2 })}`}
          sub="this month"
          growth={kpis?.revenueGrowth}
        />
        <KpiCard
          label="Total Orders"
          Icon={FiShoppingBag}
          accent="#818cf8"
          value={(kpis?.totalOrders || 0).toLocaleString()}
          sub={`+${kpis?.monthOrders || 0} this month`}
        />
        <KpiCard
          label="Customers"
          Icon={FiUsers}
          accent="#34d399"
          value={(kpis?.totalUsers || 0).toLocaleString()}
          sub={`+${kpis?.monthUsers || 0} this month`}
        />
        <KpiCard
          label="Pending Orders"
          Icon={FiClock}
          accent="#fbbf24"
          value={(kpis?.pendingOrders || 0).toLocaleString()}
          sub="awaiting action"
        />
      </div>

      {/* Revenue chart + order status */}
      <div className="grid xl:grid-cols-3 gap-4">
        {/* Revenue chart */}
        <div className="xl:col-span-2 bg-[#1a1a1a] border border-white/5 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-[0.65rem] tracking-[0.2em] uppercase text-gray-500 mb-1">
                Revenue
              </p>
              <p className="text-white text-xl font-light">
                GH₵{" "}
                {(kpis?.monthRevenue || 0).toLocaleString("en-GH", {
                  minimumFractionDigits: 2,
                })}
                <span className="text-gray-600 text-sm ml-2 font-normal">
                  this month
                </span>
              </p>
            </div>
          </div>
          {/* Bar chart */}
          <div className="flex items-end gap-1 h-28">
            {(revenueByDay || []).slice(-30).map((d, i) => {
              const max = Math.max(
                ...(revenueByDay || []).map((x) => x.revenue),
                1,
              );
              const height = Math.max(4, (d.revenue / max) * 112);
              return (
                <div
                  key={i}
                  className="flex-1 flex flex-col items-center gap-1 group relative"
                >
                  <div
                    style={{ height: `${height}px` }}
                    className="w-full bg-pink-800/60 hover:bg-pink-600/80 rounded-sm transition-colors cursor-pointer"
                  />
                  <div className="absolute bottom-full mb-1 hidden group-hover:flex bg-[#2a2a2a] text-white text-[0.6rem] px-2 py-1 rounded-lg whitespace-nowrap z-10 flex-col items-center">
                    <span>{d._id}</span>
                    <span className="text-pink-400">
                      GH₵ {d.revenue.toFixed(2)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between mt-2">
            <p className="text-[0.6rem] text-gray-700">30 days ago</p>
            <p className="text-[0.6rem] text-gray-700">Today</p>
          </div>
        </div>

        {/* Order status breakdown */}
        <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-5">
          <p className="text-[0.65rem] tracking-[0.2em] uppercase text-gray-500 mb-5">
            Orders by Status
          </p>
          <div className="flex flex-col gap-3">
            {[
              { key: "pending", label: "Pending", color: "#fbbf24" },
              { key: "processing", label: "Processing", color: "#818cf8" },
              { key: "shipped", label: "Shipped", color: "#a78bfa" },
              { key: "delivered", label: "Delivered", color: "#34d399" },
              { key: "cancelled", label: "Cancelled", color: "#f87171" },
            ].map(({ key, label, color }) => {
              const count = statusMap[key] || 0;
              const total = kpis?.totalOrders || 1;
              const pct = Math.round((count / total) * 100);
              return (
                <div key={key}>
                  <div className="flex justify-between text-[0.7rem] mb-1">
                    <span className="text-gray-400">{label}</span>
                    <span className="text-gray-300">{count}</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${pct}%`, background: color }}
                      className="h-full rounded-full transition-all duration-700"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top products + Recent orders */}
      <div className="grid xl:grid-cols-2 gap-4">
        {/* Top products */}
        <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-5">
          <p className="text-[0.65rem] tracking-[0.2em] uppercase text-gray-500 mb-5">
            Top Products
          </p>
          <div className="flex flex-col gap-3">
            {(topProducts || []).map((p, i) => (
              <div key={p._id} className="flex items-center gap-4">
                <span className="text-[0.65rem] text-gray-700 w-4 shrink-0">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-200 truncate">{p.title}</p>
                  <p className="text-[0.65rem] text-gray-600">
                    {p.unitsSold} sold
                  </p>
                </div>
                <p className="text-sm text-pink-400 shrink-0">
                  GH₵{" "}
                  {p.revenue.toLocaleString("en-GH", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
            ))}
            {!topProducts?.length && (
              <p className="text-gray-700 text-sm text-center py-4">
                No sales data yet
              </p>
            )}
          </div>
        </div>

        {/* Recent orders */}
        <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-5">
          <p className="text-[0.65rem] tracking-[0.2em] uppercase text-gray-500 mb-5">
            Recent Orders
          </p>
          <div className="flex flex-col gap-3">
            {(recentOrders || []).map((o) => (
              <div key={o._id} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-pink-900/30 flex items-center justify-center text-pink-400 text-[0.65rem] font-medium shrink-0">
                  {o.user?.firstName?.[0]}
                  {o.user?.lastName?.[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-200 truncate">
                    {o.user?.firstName} {o.user?.lastName}
                  </p>
                  <p className="text-[0.65rem] text-gray-600 truncate">
                    {o.user?.email}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <p className="text-sm text-white">
                    GH₵ {o.total?.toFixed(2)}
                  </p>
                  <StatusBadge status={o.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
