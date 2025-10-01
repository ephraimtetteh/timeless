import React, { useState } from "react";
import { FiLock, FiLogIn, FiMail } from "react-icons/fi";
import { Link } from "react-router-dom";
// import { Login } from 'react-router-dom';
// import { Link } from 'react-router-dom';

// props
const FormInput = ({ id, label, type = "text", value, onChange, Icon }) => (
  <div className="mb-6">
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-2"
    >
      {label}
    </label>
    <div className="relative rounded-lg shadow-sm">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Icon className="h-5 w-5 text-pink-600" aria-hidden="true" />
      </div>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        required
        className="block w-full rounded-lg border-0 py-3 pl-10 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition duration-150 ease-in-out"
        placeholder={label}
      />
    </div>
  </div>
);

/**
 * Main Login Form Component with Image Sidebar
 */
const App = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    // Simulate an API call
    setTimeout(() => {
      setIsLoading(false);
      // Basic validation check
      if (
        formData.email === "user@example.com" &&
        formData.password === "password"
      ) {
        setMessage({
          type: "success",
          text: "Login successful! Redirecting...",
        });
      } else if (formData.email && formData.password) {
        setMessage({
          type: "error",
          text: "Invalid credentials. Please try again.",
        });
      } else {
        setMessage({
          type: "error",
          text: "Please enter both email and password.",
        });
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 sm:p-6 font-inter">
      {/* Container Card */}
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="grid lg:grid-cols-2">

          {/* Image */}
          <div className="hidden lg:block">
            <img
              className="h-full w-full object-cover"
              src="/Perfume1.jpg"
              alt="image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/Perfume1.jpg";
              }}
            />
          </div>

          {/* 2. Login Form */}
          <div className="p-8 sm:p-12 md:p-16 lg:p-14 xl:p-20 flex flex-col justify-center">
            <div className="mb-10 text-center lg:text-left">
              <h2 className="text-4xl font-extrabold text-pink-700 tracking-tight mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-500 text-lg">
                Sign in to continue to your dashboard.
              </p>
            </div>

            {/* Message Box */}
            {message.text && (
              <div
                className={`p-3 mb-6 rounded-lg text-sm transition duration-300 ${
                  message.type === "success"
                    ? "bg-green-100 text-green-700 border border-green-300"
                    : "bg-red-100 text-red-700 border border-red-300"
                }`}
                role="alert"
              >
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <FormInput
                id="email"
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={handleChange}
                Icon={FiMail}
              />

              <FormInput
                id="password"
                label="Password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                Icon={FiLock}
              />

              {/* Options Row */}
              <div className="flex items-center justify-between pt-2">
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
                    className="font-medium text-pink-600 hover:text-pink-500 transition duration-150 ease-in-out"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-medium text-white bg-pink-600 hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
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
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    <FiLogIn className="w-5 h-5 mr-2" />
                  )}
                  {isLoading ? "Loging in..." : "  Login"}
                </button>
              </div>
            </form>

            {/* Signup Link */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?
           
                <Link
                  to="/Signup"
                  className="font-medium text-pink-600 hover:text-pink-500"
                >
                  Create an Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
