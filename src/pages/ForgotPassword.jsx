import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    // Main wrapper
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4 sm:p-6">
      {/* Card container */}
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col justify-center items-center py-8 px-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-pink-700 tracking-tight">
            Forgot Password
          </h1>
          <p className="mt-3 text-gray-500 text-sm sm:text-base tracking-tight">
            Enter your email address below and we'  ll send you a link to reset
            your password.
          </p>
        </div>

        {/* Form input */}
        <div className="w-full mt-8">
          <input
            className="w-full border border-gray-300 rounded-lg py-3 pl-3 text-gray-900 placeholder:text-gray-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-300 text-sm sm:text-base transition duration-150 ease-in-out mb-6"
            type="email"
            placeholder="Enter your email"
            name="email"
            id="email"
            required
          />
        </div>

        {/* Submit button */}
        <div className="w-full">
          <button
            type="submit"
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-medium text-white bg-pink-700 hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed mb-4"
          >
            Reset Password
          </button>
        </div>

        {/* Back to login */}
        <div className="text-center">
          <p className="text-sm text-gray-900">
            Remember your password? Go back to
            <Link
              to="/login"
              className="text-pink-700 font-bold hover:text-pink-500 pl-1"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
