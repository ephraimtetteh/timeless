import { FiLogIn } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useState } from "react";

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4 sm:p-6">
      {/* Container div */}
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left image */}
          <div className="hidden lg:block">
            <img
              className="w-full h-full object-cover"
              src="/Perfume1.jpg"
              alt="Perfume bottle"
            />
          </div>

          {/* Right form */}
          <div className="w-full flex flex-col justify-center gap-4 p-8 sm:p-12 md:p-16 lg:p-14 xl:p-20">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-pink-700 tracking-tight ">
              Create an Account
            </h2>
            <p className="text-gray-500 text-lg">
              Unlock exclusive scents & timeless offers.
            </p>

            {/* Form inputs */}
            <div className="flex flex-col max-w-md w-full">
              <label className="py-2" htmlFor="fullName">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                className="w-full rounded-lg border border-gray-300 py-3 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-pink-600 focus:border-pink-600 sm:text-sm transition"
              />
            </div>

            <div className="flex flex-col max-w-md w-full">
              <label className="py-2" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email address"
                className="w-full rounded-lg border border-gray-300 py-3 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-pink-600 focus:border-pink-600 sm:text-sm transition"
              />
            </div>

            <div className="flex flex-col max-w-md w-full">
              <label className="py-2" htmlFor="contacts">
                Phone Number
              </label>
              <input
                id="contacts"
                type="tel"
                placeholder="Enter your number here"
                className="w-full rounded-lg border border-gray-300 py-3 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-pink-600 focus:border-pink-600 sm:text-sm transition"
              />
            </div>

            <div className="flex flex-col max-w-md w-full">
              <label className="py-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Create a secure password"
                className="w-full rounded-lg border border-gray-300 py-3 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-pink-600 focus:border-pink-600 sm:text-sm transition"
              />
            </div>

            <div className="flex flex-col max-w-md w-full">
              <label className="py-2" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Re-enter your password"
                className="w-full rounded-lg border border-gray-300 py-3 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-pink-600 focus:border-pink-600 sm:text-sm transition"
              />
            </div>

            {/* Remember me & forgot password */}
            <div className="flex items-center justify-between max-w-md w-full py-3">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-medium text-pink-600 hover:text-pink-500 transition"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            {/* Signup button */}
            <div className="max-w-md w-full">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-medium text-white bg-pink-600 hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 
                        0 5.373 0 12h4zm2 5.291A7.962 
                        7.962 0 014 12H0c0 3.042 
                        1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  <FiLogIn className="w-5 h-5 mr-2" />
                )}
                {isLoading
                  ? "Creating Your Account..."
                  : "Sign Up"}
              </button> 
            </div>

            {/* Login link */}
            <p className="text-gray-500 text-lg pt-2">
              Already a member?{" "}
              <Link
                to="/login"
                className="font-medium text-pink-600 hover:text-pink-500 transition"
              >
                Login 
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
