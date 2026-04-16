// src/lib/features/cart/cartSlice.js
// Cart now starts EMPTY — products are fetched from the API, not static data.
// Each cart item shape: { _id, id, title, img, price, amount, size, category }
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  delivery: 5,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add a product to the cart or increment if already there.
    // Payload: full product object from the API.
    addToCart: (state, action) => {
      const product = action.payload;
      // Use MongoDB _id as the canonical cart key
      const id = product._id || product.id;
      const existing = state.cartItems.find((i) => (i._id || i.id) === id);
      if (existing) {
        existing.amount += 1;
      } else {
        state.cartItems.push({
          _id: product._id,
          id: product._id || product.id,
          title: product.title,
          img: product.img || product.images?.[0] || "",
          price: product.price,
          size: product.size || "",
          category: product.category || "",
          amount: 1,
        });
      }
    },

    increase: (state, action) => {
      // payload = _id string
      const item = state.cartItems.find(
        (i) => (i._id || i.id) === action.payload,
      );
      if (item) item.amount += 1;
    },

    decrease: (state, action) => {
      const item = state.cartItems.find(
        (i) => (i._id || i.id) === action.payload,
      );
      if (item && item.amount > 1) item.amount -= 1;
    },

    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (i) => (i._id || i.id) !== action.payload,
      );
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.amount = 0;
      state.total = 0;
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

export const {
  addToCart,
  increase,
  decrease,
  removeItem,
  clearCart,
  calculateTotal,
} = cartSlice.actions;

export default cartSlice.reducer;
