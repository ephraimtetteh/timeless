// Login.jsx — luxury split-screen authentication
import { useState } from "react";
import { FiLock, FiMail, FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    // Simulate API call — replace with real auth
    await new Promise((r) => setTimeout(r, 1400));

    if (
      formData.email === "user@example.com" &&
      formData.password === "password"
    ) {
      setStatus("success");
      setTimeout(() => navigate("/"), 1200);
    } else if (formData.email && formData.password) {
      setStatus("error");
      setErrorMsg("Invalid email or password. Please try again.");
    } else {
      setStatus("error");
      setErrorMsg("Please enter your email and password.");
    }
  };

  return (
    <div className="min-h-screen flex font-['Jost',sans-serif] bg-[#faf8f6]">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500&display=swap');`}</style>

      {/* Left — Image Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gray-900">
        <img
          src="/Perfume1.jpg"
          alt="Timeless Fragrance"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-pink-900/40 via-transparent to-black/50" />

        {/* Overlay content */}
        <div className="absolute inset-0 flex flex-col justify-between p-14 text-white">
          <div className="flex items-center gap-3">
            <img
              src="/tlogo.png"
              alt="Timeless"
              className="w-10 h-10 object-contain"
            />
            <span
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
              className="text-xl font-light tracking-wider"
            >
              Timeless
            </span>
          </div>
          <div>
            <p className="text-[0.65rem] tracking-[0.3em] uppercase text-pink-300 mb-4">
              Welcome Back
            </p>
            <h2
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
              className="text-5xl font-light leading-tight text-white mb-4"
            >
              Every scent
              <br />
              <em>tells your story.</em>
            </h2>
            <p className="text-white/60 text-sm max-w-xs leading-relaxed">
              Sign in to access your wishlist, track orders, and discover new
              arrivals curated just for you.
            </p>
          </div>
        </div>
      </div>

      {/* Right — Form Panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-16 lg:px-16">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-10 lg:hidden">
            <img src="/tlogo.png" alt="Timeless" className="w-9" />
            <span
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
              className="text-xl text-gray-800 font-medium"
            >
              Timeless
            </span>
          </div>

          <div className="mb-8">
            <p className="text-[0.65rem] tracking-[0.3em] uppercase text-pink-500 mb-2">
              Sign In
            </p>
            <h1
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
              className="text-4xl text-gray-900 font-light"
            >
              Welcome back
            </h1>
            <p className="text-gray-400 text-sm mt-2">
              Enter your details to continue.
            </p>
          </div>

          {/* Status message */}
          {status === "success" && (
            <div className="mb-6 px-4 py-3 bg-green-50 border border-green-200 rounded-xl text-sm text-green-700 flex items-center gap-2">
              <span>✓</span> Login successful — redirecting…
            </div>
          )}
          {status === "error" && (
            <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Email */}
            <div>
              <label className="text-[0.7rem] tracking-widest uppercase text-gray-500 mb-2 block">
                Email
              </label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-400 text-sm" />
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-800 bg-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-400 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-[0.7rem] tracking-widest uppercase text-gray-500 mb-2 block">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-400 text-sm" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl text-sm text-gray-800 bg-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-400 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-500 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-pink-600 focus:ring-pink-400"
                />
                <span className="text-sm text-gray-500">Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-[0.75rem] text-pink-600 hover:text-pink-800 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="w-full py-3.5 bg-pink-700 hover:bg-pink-800 disabled:opacity-60 disabled:cursor-not-allowed text-white text-[0.75rem] tracking-[0.2em] uppercase font-medium rounded-full transition-all duration-300 flex items-center justify-center gap-2 mt-1"
            >
              {status === "loading" ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>
                  Signing in…
                </>
              ) : status === "success" ? (
                "✓ Signed in"
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-[0.65rem] text-gray-300 tracking-widest uppercase">
              or
            </span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          {/* Signup link */}
          <p className="text-center text-sm text-gray-400">
            No account yet?{" "}
            <Link
              to="/signup"
              className="text-pink-600 hover:text-pink-800 font-medium transition-colors"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
