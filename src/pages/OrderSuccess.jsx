// src/pages/OrderSuccess.jsx
import { Link, useLocation } from "react-router-dom";

export const OrderSuccess = () => {
  const { state } = useLocation();
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-5 text-center px-6 bg-[#faf8f6] font-['Jost',sans-serif]">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,400&family=Jost:wght@300;400;500&display=swap');`}</style>
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
        <svg
          className="w-8 h-8 text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h1
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
        className="text-4xl text-gray-900 font-light"
      >
        Order Confirmed!
      </h1>
      {state?.orderId && (
        <p className="text-sm text-gray-400 font-mono bg-gray-100 px-4 py-2 rounded-lg">
          #{state.orderId}
        </p>
      )}
      <p className="text-gray-500 text-sm max-w-xs">
        A confirmation email has been sent to your inbox. We'll notify you when
        your order ships.
      </p>
      <div className="flex gap-3 mt-2">
        <Link
          to="/orders"
          className="px-6 py-3 border border-pink-300 text-pink-700 rounded-full text-sm hover:bg-pink-50 transition-colors"
        >
          View Orders
        </Link>
        <Link
          to="/"
          className="px-6 py-3 bg-pink-700 text-white rounded-full text-sm hover:bg-pink-800 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </main>
  );
};




