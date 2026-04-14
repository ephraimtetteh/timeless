// src/pages/admin/AdminLayout.jsx
import { useState } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../lib/features/auth/authSlice";
import {
  FiGrid,
  FiShoppingBag,
  FiUsers,
  FiPackage,
  FiLogOut,
  FiMenu,
  FiX,
  FiChevronRight,
} from "react-icons/fi";

const NAV = [
  { label: "Overview", to: "/admin", Icon: FiGrid },
  { label: "Orders", to: "/admin/orders", Icon: FiShoppingBag },
  { label: "Products", to: "/admin/products", Icon: FiPackage },
  { label: "Customers", to: "/admin/customers", Icon: FiUsers },
];

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.auth);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  const isActive = (to) =>
    to === "/admin"
      ? location.pathname === "/admin"
      : location.pathname.startsWith(to);

  return (
    <div className="flex h-screen bg-[#0f0f0f] font-['Jost',sans-serif] overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Jost:wght@300;400;500&display=swap');
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #1a1a1a; }
        ::-webkit-scrollbar-thumb { background: #3f3f3f; border-radius: 4px; }
      `}</style>

      {/* ── Sidebar ───────────────────────────────────────── */}
      <aside
        className={`
        flex flex-col shrink-0 bg-[#141414] border-r border-white/5
        transition-all duration-300 ease-in-out
        ${sidebarOpen ? "w-56" : "w-16"}
      `}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-white/5">
          <img
            src="/tlogo.png"
            alt="Timeless"
            className="w-8 h-8 object-contain shrink-0"
          />
          {sidebarOpen && (
            <span
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
              className="text-white text-lg font-light tracking-widest whitespace-nowrap overflow-hidden"
            >
              Timeless
            </span>
          )}
        </div>

        {/* Toggle */}
        <button
          onClick={() => setSidebarOpen((v) => !v)}
          className="mx-auto mt-3 mb-1 w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-colors"
        >
          {sidebarOpen ? <FiX size={15} /> : <FiMenu size={15} />}
        </button>

        {/* Nav */}
        <nav className="flex-1 px-2 py-2 flex flex-col gap-1">
          {NAV.map(({ label, to, Icon }) => (
            <Link
              key={to}
              to={to}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 group
                ${
                  isActive(to)
                    ? "bg-pink-900/30 text-pink-400"
                    : "text-gray-500 hover:text-gray-200 hover:bg-white/5"
                }
              `}
            >
              <Icon size={16} className="shrink-0" />
              {sidebarOpen && (
                <span className="text-[0.75rem] tracking-wide whitespace-nowrap">
                  {label}
                </span>
              )}
              {sidebarOpen && isActive(to) && (
                <FiChevronRight size={12} className="ml-auto text-pink-500" />
              )}
            </Link>
          ))}
        </nav>

        {/* User + Logout */}
        <div className="p-3 border-t border-white/5">
          {sidebarOpen && (
            <div className="mb-2 px-2">
              <p className="text-[0.7rem] text-gray-300 truncate">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-[0.65rem] text-pink-600 tracking-widest uppercase">
                Admin
              </p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-900/10 transition-all"
          >
            <FiLogOut size={16} className="shrink-0" />
            {sidebarOpen && <span className="text-[0.75rem]">Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* ── Main content ──────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#141414] shrink-0">
          <div>
            <h1 className="text-white text-sm font-medium">
              {NAV.find((n) => isActive(n.to))?.label || "Dashboard"}
            </h1>
            <p className="text-gray-600 text-[0.65rem] tracking-widest uppercase mt-0.5">
              Admin Panel
            </p>
          </div>
          <Link
            to="/"
            className="text-[0.65rem] tracking-widest uppercase text-gray-500 hover:text-pink-400 transition-colors border border-white/10 px-3 py-1.5 rounded-full"
          >
            View Store →
          </Link>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
