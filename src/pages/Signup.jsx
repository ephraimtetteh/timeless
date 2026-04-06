// Signup.jsx — wired to Redux registerUser thunk
import { useState, useEffect } from "react";
import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiPhone,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearAuthError } from "../lib/features/auth/authSlice";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, error, isAuthenticated } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState("");

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  useEffect(() => () => dispatch(clearAuthError()), [dispatch]);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError("");
    if (form.password !== form.confirmPassword) {
      setLocalError("Passwords do not match.");
      return;
    }
    const { confirmPassword, ...payload } = form;
    dispatch(registerUser(payload));
  };

  const isLoading = status === "loading";
  const displayError = localError || error;

  const inputClass =
    "w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-800 bg-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-400 transition-all";

  const Field = ({ name, label, type = "text", Icon, extraRight }) => (
    <div>
      <label className="text-[0.7rem] tracking-widest uppercase text-gray-500 mb-2 block">
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-400 text-sm" />
        <input
          name={name}
          type={type}
          value={form[name]}
          onChange={handleChange}
          required={name !== "phone"}
          placeholder={label}
          className={`${inputClass} ${extraRight ? "pr-12" : ""}`}
        />
        {extraRight}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex font-['Jost',sans-serif] bg-[#faf8f6]">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,400&family=Jost:wght@300;400;500&display=swap');`}</style>

      {/* Image panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gray-900">
        <img
          src="/Perfume7.jpg"
          alt=""
          className="w-full h-full object-cover opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-pink-900/50 via-transparent to-black/60" />
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
              Join Us
            </p>
            <h2
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
              className="text-5xl font-light leading-tight mb-4"
            >
              Discover your
              <br />
              <em>signature scent.</em>
            </h2>
            <p className="text-white/60 text-sm max-w-xs leading-relaxed">
              Create an account for exclusive access to new arrivals, early
              sales, and personalised recommendations.
            </p>
          </div>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-16 lg:px-16">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-8 lg:hidden">
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
              Create Account
            </p>
            <h1
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
              className="text-4xl text-gray-900 font-light"
            >
              Join Timeless
            </h1>
            <p className="text-gray-400 text-sm mt-2">
              Fill in your details to get started.
            </p>
          </div>

          {displayError && (
            <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
              {displayError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <Field name="firstName" label="First Name" Icon={FiUser} />
              <Field name="lastName" label="Last Name" Icon={FiUser} />
            </div>
            <Field
              name="email"
              label="Email Address"
              type="email"
              Icon={FiMail}
            />
            <Field
              name="phone"
              label="Phone (optional)"
              type="tel"
              Icon={FiPhone}
            />
            <div>
              <label className="text-[0.7rem] tracking-widest uppercase text-gray-500 mb-2 block">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-400 text-sm" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="Min. 6 characters"
                  className={`${inputClass} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-500"
                >
                  {showPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                </button>
              </div>
            </div>
            <div>
              <label className="text-[0.7rem] tracking-widest uppercase text-gray-500 mb-2 block">
                Confirm Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-400 text-sm" />
                <input
                  name="confirmPassword"
                  type="password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Repeat password"
                  className={inputClass}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-pink-700 hover:bg-pink-800 disabled:opacity-60 disabled:cursor-not-allowed text-white text-[0.75rem] tracking-[0.2em] uppercase font-medium rounded-full transition-all duration-300 flex items-center justify-center gap-2 mt-2"
            >
              {isLoading ? (
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
                  Creating account…
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-[0.65rem] text-gray-300 tracking-widest uppercase">
              or
            </span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          <p className="text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-pink-600 hover:text-pink-800 font-medium transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
