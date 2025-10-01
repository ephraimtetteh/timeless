import { FiShoppingCart } from "react-icons/fi";
import { VscAccount } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-pink-100 text-gray-900 fixed top-0 left-0 z-50 shadow">
      <div className="flex items-center justify-between px-4 md:px-20  py-2">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            className="w-12 "
            src="/TM-logo.jpg"
            alt="Timeless Perfume Logo"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          <Link to="#" className="hover:text-pink-700 hover:border-b-2">Bestsellers</Link>
          <Link to="#" className="hover:text-pink-700 hover:border-b-2">New Scents</Link>
          <Link to="#" className="hover:text-pink-700 hover:border-b-2">Featured</Link>
          <Link to="#" className="hover:text-pink-700 hover:border-b-2">About Us</Link>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-6">
          <Link to="/signup" className="hover:text-pink-600">
            <VscAccount className="text-xl text-pink-700" />
          </Link>
          <span className="hover:text-pink-600">
            <FiShoppingCart className="text-xl font-extrabold" />
          </span>
          {/* Mobile Menu Button */}
          <button
            className="md:hidden ml-2 text-pink-700"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <nav className="md:hidden bg-pink-100 px-4 pb-4">
          <Link to="#" className="block py-2 hover:text-pink-700 hover:border-b-2">Bestsellers</Link>
          <Link to="#" className="block py-2 hover:text-pink-700 hover:border-b-2">New Scents</Link>
          <Link to="#" className="block py-2 hover:text-pink-700 hover:border-b-2">Featured</Link>
          <Link to="#" className="block py-2 hover:text-pink-700 hover:border-b-2">About Us</Link>
        </nav>
      )}
    </header>
  );
};

export default Header;