// Header.jsx — luxury editorial navigation with auth-aware user menu
import { useState, useEffect, useRef } from "react";
import {
  FiShoppingCart,
  FiLogOut,
  FiGrid,
  FiUser,
  FiChevronDown,
} from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { calculateTotal } from "../lib/features/cart/cartSlice";
import { logoutUser } from "../lib/features/auth/authSlice";

const NAV_LINKS = [
  { label: "Bestsellers", to: "/products" },
  // { label: "New Scents", to: "/new" },
  // { label: "Featured", to: "/featured" },
  { label: "About Us", to: "/about-us" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

  const { amount, cartItems } = useSelector((s) => s.cart);
  const { user, isAuthenticated } = useSelector((s) => s.auth);
  const isAdmin = user?.role === "admin";

  // Keep cart total in sync
  useEffect(() => {
    dispatch(calculateTotal());
  }, [cartItems, dispatch]);

  // Scroll shadow
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Close mobile menu on navigation
  useEffect(() => {
    setMenuOpen(false);
    setUserDropdown(false);
  }, [location]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const fn = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setUserDropdown(false);
      }
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  const isActive = (to) => location.pathname === to;

  // First name or truncated email for display
  const displayName = user ? user.firstName || user.email?.split("@")[0] : null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500&family=Jost:wght@300;400;500&display=swap');
        .nav-link { font-family: 'Jost', sans-serif; font-size: 0.7rem; letter-spacing: 0.18em; text-transform: uppercase; position: relative; }
        .nav-link::after { content: ''; position: absolute; bottom: -3px; left: 0; width: 100%; height: 1px; background: #be185d; transform: scaleX(0); transform-origin: right; transition: transform 0.3s ease; }
        .nav-link:hover::after, .nav-link.active::after { transform: scaleX(1); transform-origin: left; }
        .cart-badge { animation: pop 0.3s cubic-bezier(.36,.07,.19,.97) both; }
        @keyframes pop { 0%,100%{transform:scale(1)} 50%{transform:scale(1.4)} }
        .mobile-nav { animation: slideDown 0.25s ease forwards; }
        @keyframes slideDown { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
        .user-dropdown { animation: fadeIn 0.18s ease forwards; }
        @keyframes fadeIn { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      <header
        className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-pink-100"
            : "bg-[#faf8f6]/95 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-16 py-4">
          {/* ── Logo ─────────────────────────────────── */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img
              className="w-10 h-10 object-contain"
              src="/tlogo.png"
              alt="Timeless"
            />
            <span
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
              className="hidden sm:block text-lg font-medium text-gray-800 tracking-wide"
            >
              Timeless
            </span>
          </Link>

          {/* ── Desktop Nav ───────────────────────────── */}
          <nav className="hidden lg:flex items-center gap-10">
            {NAV_LINKS.map(({ label, to }) => (
              <Link
                key={label}
                to={to}
                className={`nav-link text-gray-600 hover:text-pink-700 transition-colors ${isActive(to) ? "active text-pink-700" : ""}`}
              >
                {label}
              </Link>
            ))}
            {/* Admin dashboard link — desktop */}
            {isAdmin && (
              <Link
                to="/admin"
                className={`nav-link text-pink-600 hover:text-pink-800 transition-colors flex items-center gap-1.5 ${isActive("/admin") ? "active" : ""}`}
              >
                <FiGrid size={11} />
                Dashboard
              </Link>
            )}
          </nav>

          {/* ── Right actions ────────────────────────── */}
          <div className="flex items-center gap-5">
            {/* Cart */}
            <Link
              to="/checkout"
              className="relative text-gray-600 hover:text-pink-700 transition-colors"
              aria-label={`Cart, ${amount} items`}
            >
              <FiShoppingCart className="text-[1.2rem]" />
              {amount > 0 && (
                <span
                  key={amount}
                  className="cart-badge absolute -top-2 -right-2.5 min-w-[18px] h-[18px] bg-pink-600 text-white text-[0.6rem] font-bold rounded-full flex items-center justify-center px-1"
                >
                  {amount}
                </span>
              )}
            </Link>

            {/* User area */}
            {isAuthenticated ? (
              /* ── Logged-in dropdown ──────────────────── */
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setUserDropdown((v) => !v)}
                  className="flex items-center gap-2 group"
                  aria-label="User menu"
                >
                  {/* Avatar circle */}
                  <div className="w-8 h-8 rounded-full bg-pink-100 border border-pink-200 flex items-center justify-center shrink-0">
                    <span className="text-[0.65rem] font-semibold text-pink-700 uppercase">
                      {user?.firstName?.[0]}
                      {user?.lastName?.[0]}
                    </span>
                  </div>
                  {/* Name — desktop only */}
                  <span className="hidden lg:block text-[0.75rem] text-gray-700 group-hover:text-pink-700 transition-colors max-w-[90px] truncate">
                    {displayName}
                  </span>
                  <FiChevronDown
                    size={12}
                    className={`hidden lg:block text-gray-400 transition-transform duration-200 ${userDropdown ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Dropdown panel */}
                {userDropdown && (
                  <div className="user-dropdown absolute right-0 top-full mt-3 w-52 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden z-50">
                    {/* User info header */}
                    <div className="px-4 py-3 border-b border-gray-50 bg-pink-50/60">
                      <p className="text-sm font-medium text-gray-800 truncate">
                        {user?.firstName} {user?.lastName}
                      </p>
                      <p className="text-[0.65rem] text-gray-400 truncate">
                        {user?.email}
                      </p>
                      {isAdmin && (
                        <span className="inline-block mt-1 text-[0.55rem] tracking-widest uppercase bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full">
                          Admin
                        </span>
                      )}
                    </div>

                    {/* Menu items */}
                    <div className="py-1">
                      <Link
                        to="/order-success"
                        className="flex items-center gap-3 px-4 py-2.5 text-[0.75rem] text-gray-600 hover:text-pink-700 hover:bg-pink-50 transition-colors"
                      >
                        <FiShoppingCart size={13} />
                        My Orders
                      </Link>

                      {isAdmin && (
                        <Link
                          to="/admin"
                          className="flex items-center gap-3 px-4 py-2.5 text-[0.75rem] text-pink-700 font-medium hover:bg-pink-50 transition-colors"
                        >
                          <FiGrid size={13} />
                          Admin Dashboard
                        </Link>
                      )}

                      <div className="border-t border-gray-50 mt-1 pt-1">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-[0.75rem] text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <FiLogOut size={13} />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* ── Guest — show Sign In text link ─────── */
              <Link
                to="/login"
                className="nav-link text-gray-600 hover:text-pink-700 transition-colors hidden sm:block"
              >
                Sign In
              </Link>
            )}

            {/* ── Hamburger ────────────────────────────── */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              className="lg:hidden flex flex-col gap-[5px] justify-center w-7 h-7 relative"
            >
              <span
                className={`block h-px w-full bg-gray-700 transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[6px]" : ""}`}
              />
              <span
                className={`block h-px w-full bg-gray-700 transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`}
              />
              <span
                className={`block h-px w-full bg-gray-700 transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[6px]" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* ── Mobile Nav ───────────────────────────────── */}
        {menuOpen && (
          <nav className="mobile-nav lg:hidden bg-white border-t border-pink-50 px-6 py-4 flex flex-col gap-1">
            {NAV_LINKS.map(({ label, to }) => (
              <Link
                key={label}
                to={to}
                className={`nav-link py-3 border-b border-gray-50 text-gray-700 hover:text-pink-700 transition-colors ${isActive(to) ? "text-pink-700" : ""}`}
              >
                {label}
              </Link>
            ))}

            {isAdmin && (
              <Link
                to="/admin"
                className="nav-link py-3 border-b border-gray-50 text-pink-600 font-medium flex items-center gap-2"
              >
                <FiGrid size={13} /> Admin Dashboard
              </Link>
            )}

            <div className="pt-2 mt-1 border-t border-gray-50">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-3 py-3">
                    <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center shrink-0">
                      <span className="text-[0.65rem] font-semibold text-pink-700 uppercase">
                        {user?.firstName?.[0]}
                        {user?.lastName?.[0]}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-800">
                        {user?.firstName} {user?.lastName}
                      </p>
                      {isAdmin && (
                        <span className="text-[0.6rem] tracking-widest uppercase text-pink-600">
                          Admin
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="nav-link py-3 text-red-500 flex items-center gap-2 w-full"
                  >
                    <FiLogOut size={13} /> Sign Out
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="nav-link py-3 text-gray-700 hover:text-pink-700 transition-colors block"
                >
                  Sign In
                </Link>
              )}
            </div>
          </nav>
        )}
      </header>
    </>
  );
};

export default Header;
