import { FiLogIn } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="flex  justify-center items-center cursor-pointer  gap-1 border-2 border-slate-100 min-h-screen  bg-gray-50 p-4 sm:p-6 ">
      {/* Container div */}
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="hidden lg:block ">
            <img
              className="w-full h-full object-cover"
              src="/Perfume1.jpg"
              alt="image"
            />
          </div>

          {/* Forms */}
          <div className=" w-full p-8 sm:p-12 md:p-16 lg:p-14 xl:p-20 flex flex-col justify-centerflex  gap-2 justify-center items-center py-9 ">
            <h2 className="text-4xl font-extrabold text-pink-700 tracking-tight mb-2">
              Signup Form
            </h2>
            <p className="text-gray-500 text:lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>

            <div className="flex flex-col">
              <label className="py-2" htmlFor="text">
                Full Name
              </label>
              <input
                className="block w-[400px] rounded-lg border-0 py-3 pl-10 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition duration-150 ease-in-out"
                type="text"
                name=""
                id=""
                placeholder="Enter your name"
              />
            </div>
            <div className="flex flex-col">
              <label className="py-2" htmlFor="text">
                Email
              </label>
              <input
                className="block w-[400px] rounded-lg border-0 py-3 pl-10 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition duration-150 ease-in-out  "
                type="text"
                name=""
                id=""
                placeholder="info@email"
              />
            </div>

            <div className="flex flex-col">
              <label className="py-2" htmlFor="text">
                Contacts
              </label>
              <input
                className="block w-[400px] rounded-lg border-0 py-3 pl-10 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition duration-150 ease-in-out  "
                type="text"
                name="text"
                id="text"
                placeholder="Enter your number"
              />
            </div>

            <div className="flex flex-col">
              <label className="py-2" htmlFor="text">
                Password
              </label>
              <input
                className="block w-[400px] rounded-lg border-0 py-3 pl-10 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition duration-150 ease-in-out  "
                type="text"
                name="text"
                id="text"
                placeholder="Enter your password"
              />
            </div>
            <div className="flex flex-col">
              <label className="py-2" htmlFor="text">
                Confirm Password
              </label>
              <input
                className="block w-[400px] rounded-lg border-0 py-3 pl-10 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition duration-150 ease-in-out "
                type="text"
                name="text"
                id="text"
                placeholder="confirm password"
              />
            </div>

            <div className="flex items-center justify-between pt-2 py-3 gap-33">
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

            {/* <button className="w-70 rounded py-1 px-2 text-black bg-pink-600 text-x border-shadow-md  ">
                Signup
            </button> */}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-[400px] flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-medium text-white bg-pink-600 hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
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
                {isLoading ? "Signing up..." : "Signup"}
              </button>
            </div>

            <p className="text-gray-500 text:lg">
              Already have an account?
              <Link
                to="/Login"
                className="font-medium text-pink-600 hover:text-pink-500 transition duration-150 ease-in-out"
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
