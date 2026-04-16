// CartItem.jsx — improved UI with accessible controls
import React from "react";
import { useDispatch } from "react-redux";
import imgUrl from "../utils/imgUrl";
import { decrease, increase, removeItem } from "../lib/features/cart/cartSlice";

const CartItem = ({ id, img, title, amount, price }) => {
  const dispatch = useDispatch();

  const handleDecrease = () => {
    if (amount === 1) {
      dispatch(removeItem(id));
    } else {
      dispatch(decrease(id));
    }
  };

  return (
    <div className="cart-item grid grid-cols-[80px_1fr_auto_auto] items-center gap-4 py-4 border-b border-gray-100 last:border-none">
      <img
        src={imgUrl(img)}
        alt={title}
        className="w-20 h-20 object-cover rounded-xl border border-gray-200"
      />

      <div className="flex flex-col gap-1">
        <h4 className="font-semibold text-gray-800 text-sm leading-tight">
          {title}
        </h4>
        <p className="text-pink-500 font-bold text-sm">
          GH₵ {price.toFixed(2)}
        </p>
      </div>

      <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
        <button
          onClick={handleDecrease}
          aria-label="Decrease quantity"
          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
        >
          −
        </button>
        <span className="w-8 text-center text-sm font-semibold text-gray-700">
          {amount}
        </span>
        <button
          onClick={() => dispatch(increase(id))}
          aria-label="Increase quantity"
          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
        >
          +
        </button>
      </div>

      <div className="flex flex-col items-end gap-2">
        <p className="font-bold text-gray-800 text-sm">
          GH₵ {(price * amount).toFixed(2)}
        </p>
        <button
          onClick={() => dispatch(removeItem(id))}
          aria-label="Remove item"
          className="text-xs text-red-400 hover:text-red-600 transition-colors underline"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
