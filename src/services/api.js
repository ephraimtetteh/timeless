// src/services/api.js
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

// ── Authenticated instance (sends cookies + Bearer token) ─
// Used for: auth, orders, payments, admin, cart checkout
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
  timeout: 15000,
});

// ── Public instance (no credentials) ──────────────────────
// Used for: GET /products, GET /products/:id
// withCredentials: false avoids the CORS wildcard restriction on public routes
const publicApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
  timeout: 15000,
});

// ── Request interceptor — attach Bearer token ─────────────
const attachToken = (config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
};
api.interceptors.request.use(attachToken, (e) => Promise.reject(e));

// ── Response interceptor — handle errors ──────────────────
const handleError = (error) => {
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
  if (error.response.status === 401) {
    localStorage.removeItem("token");
    if (window.location.pathname !== "/login") window.location.href = "/login";
  }
  return Promise.reject(error);
};
api.interceptors.response.use((r) => r, handleError);
publicApi.interceptors.response.use((r) => r, handleError);

// ─── Auth (credentialed) ───────────────────────────────────
export const authAPI = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  logout: () => api.post("/auth/logout"),
  getMe: () => api.get("/auth/me"),
  forgotPassword: (email) => api.post("/auth/forgot-password", { email }),
  resetPassword: (token, password) =>
    api.post("/auth/reset-password", { token, password }),
};

// ─── Products (public reads, credentialed writes) ──────────
export const productAPI = {
  getAll: (params) => publicApi.get("/products", { params }),
  getById: (id) => publicApi.get(`/products/${id}`),
  addReview: (id, data) => api.post(`/products/${id}/reviews`, data),
  // Admin writes
  create: (data) => api.post("/products", data),
  update: (id, data) => api.patch(`/products/${id}`, data),
  remove: (id) => api.delete(`/products/${id}`),
};

// ─── Orders ───────────────────────────────────────────────
export const orderAPI = {
  getMine: () => api.get("/orders/mine"),
  getById: (id) => api.get(`/orders/${id}`),
  getAll: () => api.get("/orders"),
  updateStatus: (id, status) => api.patch(`/orders/${id}/status`, { status }),
};

// ─── Payments ─────────────────────────────────────────────
export const paymentAPI = {
  createIntent: (payload) => api.post("/payments/create-intent", payload),
  confirm: (paymentIntentId) =>
    api.post("/payments/confirm", { paymentIntentId }),
};

export default api;
