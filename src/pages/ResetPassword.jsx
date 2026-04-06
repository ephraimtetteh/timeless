// ─────────────────────────────────────────────────────────
// src/pages/ResetPassword.jsx
// ─────────────────────────────────────────────────────────
import { FiLock } from "react-icons/fi";
import { useNavigate, useSearchParams } from "react-router-dom";
// import { useDispatch } from "react-redux";
import { authAPI } from "../services/api";
import { useState } from "react";

 const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const [form, setForm] = useState({ password: "", confirmPassword: "" });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setStatus("loading");
    try {
      await authAPI.resetPassword(token, form.password);
      navigate("/login", {
        state: { message: "Password reset successful. Please log in." },
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Reset failed. The link may have expired.",
      );
      setStatus("error");
    }
  };

  const inputClass =
    "w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-400 transition-all";

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf8f6] px-6 font-['Jost',sans-serif]">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <img src="/tlogo.png" alt="Timeless" className="w-12 mx-auto mb-4" />
          <h1
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
            className="text-4xl text-gray-900 font-light"
          >
            Reset Password
          </h1>
          <p className="text-gray-400 text-sm mt-2">
            Enter your new password below.
          </p>
        </div>

        {error && (
          <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-400 text-sm" />
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={(e) =>
                setForm((p) => ({ ...p, password: e.target.value }))
              }
              required
              placeholder="New password (min. 6 chars)"
              className={inputClass}
            />
          </div>
          <div className="relative">
            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-400 text-sm" />
            <input
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={(e) =>
                setForm((p) => ({ ...p, confirmPassword: e.target.value }))
              }
              required
              placeholder="Confirm new password"
              className={inputClass}
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full py-3.5 bg-pink-700 hover:bg-pink-800 disabled:opacity-60 text-white text-[0.75rem] tracking-[0.2em] uppercase rounded-full transition-all flex items-center justify-center gap-2 mt-1"
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
                Resetting…
              </>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};


export default ResetPassword