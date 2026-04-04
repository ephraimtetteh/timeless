// Footer.jsx — luxury editorial footer
import { Link } from "react-router-dom";
import { FaInstagram, FaTwitter, FaTiktok, FaFacebookF } from "react-icons/fa";
import { MdAddCall, MdLocationPin, MdOutlineMail } from "react-icons/md";

const NAV = [
  { label: "Home", to: "/" },
  { label: "Bestsellers", to: "/products" },
  { label: "New Scents", to: "/new" },
  { label: "About Us", to: "/about-us" },
];

const SUPPORT = [
  { label: "Help Centre", to: "/help" },
  { label: "FAQ", to: "/faq" },
  { label: "Terms of Service", to: "/terms" },
  { label: "Privacy Policy", to: "/privacy" },
];

const SOCIALS = [
  { Icon: FaFacebookF, href: "https://facebook.com", label: "Facebook" },
  { Icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
  { Icon: FaTwitter, href: "https://twitter.com", label: "Twitter" },
  { Icon: FaTiktok, href: "https://tiktok.com", label: "TikTok" },
];

const CONTACT = [
  { Icon: MdAddCall, text: "+232 72 001365 / +232 88 075019" },
  { Icon: MdOutlineMail, text: "timelessbeautyandcosmetics@gmail.com" },
  { Icon: MdLocationPin, text: "No. 8 Torwama Road-Bo, Sierra Leone" },
];

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-400 font-['Jost',sans-serif]">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&family=Jost:wght@300;400;500&display=swap');`}</style>

      <div className="max-w-7xl mx-auto px-6 lg:px-16 pt-16 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr] gap-12">
          {/* Brand Column */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <img
                src="/tlogo.png"
                alt="Timeless"
                className="w-10 h-10 object-contain opacity-90"
              />
              <span
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
                className="text-white text-xl font-light tracking-wider"
              >
                Timeless
              </span>
            </div>
            <p className="text-sm leading-relaxed text-gray-500 max-w-xs">
              Discover{" "}
              <span className="text-gray-300 font-medium">TIMELESS</span>, where
              every drop tells a story. Our curated scents capture the essence
              of cherished memories — bottling the past, present, and future
              into an unforgettable experience.
            </p>
            <div className="flex gap-3 mt-1">
              {SOCIALS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 border border-gray-700 rounded-full flex items-center justify-center text-gray-500 hover:border-pink-500 hover:text-pink-500 transition-all duration-300"
                >
                  <Icon size={13} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-[0.65rem] tracking-[0.25em] uppercase text-gray-600 mb-5">
              Navigate
            </p>
            <ul className="flex flex-col gap-3">
              {NAV.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-sm text-gray-400 hover:text-pink-400 transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <p className="text-[0.65rem] tracking-[0.25em] uppercase text-gray-600 mb-5">
              Support
            </p>
            <ul className="flex flex-col gap-3">
              {SUPPORT.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-sm text-gray-400 hover:text-pink-400 transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[0.65rem] tracking-[0.25em] uppercase text-gray-600 mb-5">
              Contact Us
            </p>
            <ul className="flex flex-col gap-4">
              {CONTACT.map(({ Icon, text }, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm text-gray-500"
                >
                  <Icon className="text-pink-600 mt-0.5 shrink-0 text-base" />
                  <span className="leading-relaxed">{text}</span>
                </li>
              ))}
            </ul>

            {/* Newsletter */}
            <div className="mt-8">
              <p className="text-[0.65rem] tracking-[0.25em] uppercase text-gray-600 mb-3">
                Newsletter
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 bg-gray-900 border border-gray-700 border-r-0 rounded-l-full px-4 py-2.5 text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-pink-600 transition-colors"
                />
                <button className="bg-pink-700 hover:bg-pink-600 text-white text-[0.65rem] tracking-widest uppercase px-4 rounded-r-full transition-colors duration-300 shrink-0">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Divider with brand quote */}
        <div className="mt-14 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
            className="text-gray-600 text-sm italic"
          >
            "Where timeless elegance meets modern allure."
          </p>
          <p className="text-xs text-gray-600 text-center">
            © {new Date().getFullYear()} Timeless Beauty & Cosmetics. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
