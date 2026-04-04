// cartSlice.js — fixed calculateTotal + added clearCart safety
import { createSlice } from "@reduxjs/toolkit";
import { productData } from "../../../assets/assets";

const initialState = {
  cartItems: productData,
  amount: 0,
  total: 0,
  delivery: 5,
  isLoading: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
      state.amount = 0;
      state.total = 0;
    },

    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload,
      );
    },

    increase: (state, action) => {
      const item = state.cartItems.find((i) => i.id === action.payload);
      if (item) item.amount += 1;
    },

    decrease: (state, action) => {
      const item = state.cartItems.find((i) => i.id === action.payload);
      if (item && item.amount > 1) item.amount -= 1;
    },

    calculateTotal: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = parseFloat(total.toFixed(2));
    },
  },
});

export const { clearCart, removeItem, decrease, increase, calculateTotal } =
  cartSlice.actions;

export default cartSlice.reducer;
