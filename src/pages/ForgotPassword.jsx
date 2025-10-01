import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    // Main div
    <div className="flex justify-center items-center cursor-pointer border-2 border-slate-100 min-h-screen bg-gray-50 p-4 sm:p-6  ">
      {/* Container div */}
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col justify-center items-center py-8 ">
        {/* Forget Password div */}

        <div className="flex flex-col justify-center items-center ">
          <h1 className="text-4xl font-extrabold text-pink-700 tracking-tight ">
            Forgot Password
          </h1>
          <p className="text-gray-500 text:lg tracking-tight mb-10  ">
           Enter your email address below  and we'll send you   a link to reset your password.
          </p>
        </div>

        {/* forms div */}

        <div className="" >
          
          <input 
          className="w-[400px] border-0 rounded-lg py-3 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus-ring-inset focus-ring-indigo-300 sm-text-sm sm-leading-6 transition duration-150 ease-in-out mb-8 "
          type="text" 
          placeholder="   Enter your email" 
          name=""
          id=""
          // icon={<FiMail />}
          />
        </div>

        {/* Button div */}

        <div >
          <button
          type="submit"
          className="w-[400px] flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-medium text-white bg-pink-700 hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed mb-2  ">
            Reset Password</button>
        </div>

        <div>
          <p className="text-sm text-gray-900">
            Remember your password? Go back to
           <Link to="/login" className="text-pink-700 font-bold hover:text-pink-500 pl-1 " >Login
           </Link>
            
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
