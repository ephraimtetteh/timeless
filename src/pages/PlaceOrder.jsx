// PlaceOrder.jsx — uses backend API for Stripe + Nodemailer emails
//
// Setup:
//   npm install @stripe/stripe-js @stripe/react-stripe-js axios
//
// .env (frontend):
//   VITE_STRIPE_PUBLIC_KEY=pk_test_...
//   VITE_API_URL=http://localhost:5000/api

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { clearCart } from "../lib/features/cart/cartSlice";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems, total, delivery } = useSelector((state) => state.cart);
  const grandTotal = parseFloat((total + delivery).toFixed(2));

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
  });
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setStatus("processing");
    setErrorMessage("");

    try {
      const { data } = await axios.post(
        `${API}/payments/create-intent`,
        {
          items: cartItems.map((i) => ({
            productId: i.id,
            title: i.title,
            img: i.img,
            price: i.price,
            amount: i.amount,
          })),
          deliveryFee: delivery,
          deliveryAddress: {
            street: form.street,
            city: form.city,
            state: form.state,
            zip: form.zip,
            country: form.country,
          },
        },
        { withCredentials: true },
      );

      const { clientSecret, orderId } = data;

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: `${form.firstName} ${form.lastName}`,
              email: form.email,
              phone: form.phone,
              address: {
                line1: form.street,
                city: form.city,
                state: form.state,
                postal_code: form.zip,
                country: form.country,
              },
            },
          },
        },
      );

      if (error) throw new Error(error.message);

      await axios.post(
        `${API}/payments/confirm`,
        { paymentIntentId: paymentIntent.id },
        { withCredentials: true },
      );

      dispatch(clearCart());
      navigate("/order-success", { state: { orderId } });
    } catch (err) {
      setErrorMessage(
        err.response?.data?.message || err.message || "Payment failed.",
      );
      setStatus("error");
    }
  };

  const inputClass =
    "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 transition";

  return (
    <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-10">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          Delivery Information
        </h2>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="First name"
            required
            className={inputClass}
          />
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Last name"
            required
            className={inputClass}
          />
        </div>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email address"
          required
          className={`${inputClass} mb-3`}
        />
        <input
          name="street"
          value={form.street}
          onChange={handleChange}
          placeholder="Street address"
          required
          className={`${inputClass} mb-3`}
        />
        <div className="grid grid-cols-2 gap-3 mb-3">
          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="City"
            required
            className={inputClass}
          />
          <input
            name="state"
            value={form.state}
            onChange={handleChange}
            placeholder="State / Region"
            required
            className={inputClass}
          />
        </div>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <input
            name="zip"
            value={form.zip}
            onChange={handleChange}
            placeholder="Zip / Postal code"
            className={inputClass}
          />
          <input
            name="country"
            value={form.country}
            onChange={handleChange}
            placeholder="Country"
            required
            className={inputClass}
          />
        </div>
        <input
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone number"
          required
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Order Summary
          </h2>
          <div className="flex flex-col gap-2 text-sm text-gray-600">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <span className="text-gray-700">
                  {item.title}{" "}
                  <span className="text-gray-400">× {item.amount}</span>
                </span>
                <span className="font-semibold text-gray-800">
                  GH₵ {(item.price * item.amount).toFixed(2)}
                </span>
              </div>
            ))}
            <div className="border-t border-gray-100 mt-2 pt-2 flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold">GH₵ {total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span className="font-semibold">GH₵ {delivery.toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-100 pt-2 flex justify-between text-base font-bold text-gray-800">
              <span>Total</span>
              <span className="text-pink-600">GH₵ {grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Payment</h2>
          <div className="border border-gray-200 rounded-xl px-4 py-3 mb-4">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "14px",
                    color: "#374151",
                    fontFamily: "inherit",
                    "::placeholder": { color: "#9CA3AF" },
                  },
                  invalid: { color: "#EF4444" },
                },
              }}
            />
          </div>

          {errorMessage && (
            <p className="text-sm text-red-500 mb-3 bg-red-50 rounded-lg px-4 py-2">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={!stripe || status === "processing"}
            className="w-full py-4 bg-pink-500 hover:bg-pink-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold rounded-full transition-colors flex items-center justify-center gap-2"
          >
            {status === "processing" ? (
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
                Processing…
              </>
            ) : (
              `Pay GH₵ ${grandTotal.toFixed(2)}`
            )}
          </button>
          <p className="text-xs text-gray-400 text-center mt-3">
            🔒 Secured by Stripe · 256-bit SSL
          </p>
        </div>
      </div>
    </form>
  );
};

const PlaceOrder = () => (
  <main className="max-w-6xl mx-auto px-4 py-12 mt-16">
    <h1 className="text-3xl font-bold text-gray-800 mb-8">Place Your Order</h1>
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  </main>
);

export default PlaceOrder;
