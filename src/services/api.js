// src/services/api.js — Axios instance + all API calls
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // sends httpOnly cookie on every request
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 15000,
});

// ── Request interceptor — attach Bearer token if present ─
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ── Response interceptor — surface errors cleanly ────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Network error / CORS block — no response object at all
    if (!error.response) {
      console.error(
        "Network error — is the backend running on",
        BASE_URL,
        "?",
        error.message,
      );
      return Promise.reject(
        new Error("Cannot reach the server. Please check your connection."),
      );
    }

    // Auto-logout on 401
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);

// ─── Auth ──────────────────────────────────────────────────────────────
export const authAPI = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  logout: () => api.post("/auth/logout"),
  getMe: () => api.get("/auth/me"),
  forgotPassword: (email) => api.post("/auth/forgot-password", { email }),
  resetPassword: (token, password) =>
    api.post("/auth/reset-password", { token, password }),
};

// ─── Products ──────────────────────────────────────────────────────────
export const productAPI = {
  getAll: (params) => api.get("/products", { params }),
  getById: (id) => api.get(`/products/${id}`),
  create: (data) => api.post("/products", data),
  update: (id, data) => api.patch(`/products/${id}`, data),
  remove: (id) => api.delete(`/products/${id}`),
  addReview: (id, data) => api.post(`/products/${id}/reviews`, data),
};

// ─── Orders ────────────────────────────────────────────────────────────
export const orderAPI = {
  getMine: () => api.get("/orders/mine"),
  getById: (id) => api.get(`/orders/${id}`),
  getAll: () => api.get("/orders"),
  updateStatus: (id, status) => api.patch(`/orders/${id}/status`, { status }),
};

// ─── Payments ──────────────────────────────────────────────────────────
export const paymentAPI = {
  createIntent: (payload) => api.post("/payments/create-intent", payload),
  confirm: (paymentIntentId) =>
    api.post("/payments/confirm", { paymentIntentId }),
};

export default api;
