// ─────────────────────────────────────────────────────────
// src/pages/ForgotPassword.jsx
// ─────────────────────────────────────────────────────────
import { useState } from "react";
import { FiMail } from "react-icons/fi";
import { Link } from "react-router-dom";
import { authAPI } from "../services/api";

 const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | sent | error
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const { data } = await authAPI.forgotPassword(email);
      setMessage(data.message);
      setStatus("sent");
    } catch {
      setMessage("Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf8f6] px-6 font-['Jost',sans-serif]">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Jost:wght@300;400;500&display=swap');`}</style>
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <img src="/tlogo.png" alt="Timeless" className="w-12 mx-auto mb-4" />
          <h1
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
            className="text-4xl text-gray-900 font-light"
          >
            Forgot Password
          </h1>
          <p className="text-gray-400 text-sm mt-2">
            Enter your email and we'll send you a reset link.
          </p>
        </div>

        {status === "sent" ? (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
            <p className="text-green-700 text-sm">{message}</p>
            <Link
              to="/login"
              className="text-pink-600 text-sm mt-4 block hover:underline"
            >
              Back to login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {status === "error" && (
              <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
                {message}
              </div>
            )}
            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-400 text-sm" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-400 transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-3.5 bg-pink-700 hover:bg-pink-800 disabled:opacity-60 text-white text-[0.75rem] tracking-[0.2em] uppercase rounded-full transition-all flex items-center justify-center gap-2"
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
                  Sending…
                </>
              ) : (
                "Send Reset Link"
              )}
            </button>
            <Link
              to="/login"
              className="text-center text-sm text-pink-600 hover:underline"
            >
              Back to login
            </Link>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword
