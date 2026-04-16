// src/lib/features/products/productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productAPI } from "../../../services/api";

// ── Async thunks ──────────────────────────────────────────
export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (params = {}, { rejectWithValue }) => {
    try {
      const { data } = await productAPI.getAll(params);
      return data; // { products, total, pages, page, count }
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load products",
      );
    }
  },
);

export const fetchProductById = createAsyncThunk(
  "products/fetchOne",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await productAPI.getById(id);
      return data.product;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Product not found",
      );
    }
  },
);

export const submitReview = createAsyncThunk(
  "products/addReview",
  async ({ id, rating, comment }, { rejectWithValue }) => {
    try {
      const { data } = await productAPI.addReview(id, { rating, comment });
      return data.product;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to submit review",
      );
    }
  },
);

// ── Slice ─────────────────────────────────────────────────
const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [], // product list
    total: 0,
    pages: 1,
    page: 1,
    currentProduct: null,
    status: "idle", // idle | loading | succeeded | failed
    singleStatus: "idle",
    error: null,
  },
  reducers: {
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchProducts
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.products;
        state.total = action.payload.total;
        state.pages = action.payload.pages;
        state.page = action.payload.page;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // fetchProductById
      .addCase(fetchProductById.pending, (state) => {
        state.singleStatus = "loading";
        state.currentProduct = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.singleStatus = "succeeded";
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.singleStatus = "failed";
        state.error = action.payload;
      })

      // submitReview
      .addCase(submitReview.fulfilled, (state, action) => {
        state.currentProduct = action.payload;
        // Update in list too if present
        const idx = state.items.findIndex((p) => p._id === action.payload._id);
        if (idx !== -1) state.items[idx] = action.payload;
      });
  },
});

export const { clearCurrentProduct, clearError } = productSlice.actions;
export default productSlice.reducer;
