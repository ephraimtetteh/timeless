// Header.jsx — luxury editorial navigation
import { useState, useEffect } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { VscAccount } from "react-icons/vsc";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { calculateTotal } from "../lib/features/cart/cartSlice";

const NAV_LINKS = [
  { label: "Bestsellers", to: "/products" },
  // { label: "New Scents", to: "/new" },
  // { label: "Featured", to: "/featured" },
  { label: "About Us", to: "/about" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();

  const { amount, cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(calculateTotal());
  }, [cartItems, dispatch]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setMenuOpen(false), [location]);

  const isActive = (to) => location.pathname === to;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500&family=Jost:wght@300;400;500&display=swap');
        .nav-link { font-family: 'Jost', sans-serif; font-size: 0.7rem; letter-spacing: 0.18em; text-transform: uppercase; position: relative; }
        .nav-link::after { content: ''; position: absolute; bottom: -3px; left: 0; width: 100%; height: 1px; background: #be185d; transform: scaleX(0); transform-origin: right; transition: transform 0.3s ease; }
        .nav-link:hover::after, .nav-link.active::after { transform: scaleX(1); transform-origin: left; }
        .cart-badge { animation: pop 0.3s cubic-bezier(.36,.07,.19,.97) both; }
        @keyframes pop { 0%,100% { transform: scale(1); } 50% { transform: scale(1.4); } }
        .mobile-nav { animation: slideDown 0.25s ease forwards; }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <header
        className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-pink-100"
            : "bg-[#faf8f6]/95 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-16 py-4">
          {/* Logo */}
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

          {/* Desktop Nav */}
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
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-5">
            <Link
              to="/login"
              className="text-gray-600 hover:text-pink-700 transition-colors"
              aria-label="Account"
            >
              <VscAccount className="text-[1.25rem]" />
            </Link>

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

            {/* Hamburger — always visible on mobile */}
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

        {/* Mobile Nav */}
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
            <Link
              to="/login"
              className="nav-link py-3 text-gray-700 hover:text-pink-700 transition-colors mt-1"
            >
              Account
            </Link>
          </nav>
        )}
      </header>
    </>
  );
};

export default Header;
