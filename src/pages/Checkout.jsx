// Checkout.jsx — improved layout, clear cart UX
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CartItem from "../components/CartItem";
import { clearCart, calculateTotal } from "../lib/features/cart/cartSlice";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { amount, total, cartItems, delivery } = useSelector(
    (state) => state.cart,
  );
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  useEffect(() => {
    dispatch(calculateTotal());
  }, [cartItems, dispatch]);

  const handlePromo = () => {
    if (promoCode.trim().toUpperCase() === "SCENTS10") {
      setPromoApplied(true);
    } else {
      alert("Invalid promo code");
    }
  };

  const discount = promoApplied ? parseFloat((total * 0.1).toFixed(2)) : 0;
  const grandTotal = parseFloat((total + delivery - discount).toFixed(2));

  if (amount < 1) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
        <div className="text-6xl">🛒</div>
        <h2 className="text-2xl font-bold text-gray-800">Your cart is empty</h2>
        <p className="text-gray-500">Add some fragrances to get started.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-8 py-3 bg-pink-500 text-white rounded-full font-semibold hover:bg-pink-600 transition-colors"
        >
          Continue Shopping
        </button>
      </section>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-12 mt-16">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Bag</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="hidden sm:grid grid-cols-[80px_1fr_auto_auto] gap-4 pb-3 border-b border-gray-100 text-xs font-semibold text-gray-400 uppercase tracking-wide">
              <span>Item</span>
              <span>Details</span>
              <span className="text-center">Qty</span>
              <span className="text-right">Total</span>
            </div>
            {cartItems.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
            <div className="pt-4 flex justify-end">
              <button
                onClick={() => dispatch(clearCart())}
                className="text-sm text-gray-400 hover:text-red-500 transition-colors underline"
              >
                Clear all items
              </button>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Order Summary
            </h2>
            <div className="flex flex-col gap-3 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal ({amount} items)</span>
                <span className="font-semibold text-gray-800">
                  GH₵ {total.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="font-semibold text-gray-800">
                  GH₵ {delivery.toFixed(2)}
                </span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-green-600">
                  <span>Promo (10% off)</span>
                  <span>− GH₵ {discount.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t border-gray-100 pt-3 flex justify-between text-base font-bold text-gray-800">
                <span>Total</span>
                <span className="text-pink-600">
                  GH₵ {grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={() => navigate("/place-order")}
              className="mt-6 w-full py-3 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-full transition-colors"
            >
              Proceed to Checkout →
            </button>
          </div>

          {/* Promo Code */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <p className="text-sm font-semibold text-gray-700 mb-3">
              Promo Code
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Enter code"
                disabled={promoApplied}
                className="flex-1 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 disabled:bg-gray-50"
              />
              <button
                onClick={handlePromo}
                disabled={promoApplied}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded-full transition-colors disabled:opacity-50"
              >
                {promoApplied ? "✓" : "Apply"}
              </button>
            </div>
            {promoApplied && (
              <p className="text-xs text-green-600 mt-2">
                SCENTS10 applied — 10% off!
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
