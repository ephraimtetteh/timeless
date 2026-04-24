// src/services/api.js
import axios from "axios";

// ── IMPORTANT ─────────────────────────────────────────────
// Set these in your Vercel dashboard → Project → Settings → Environment Variables:
//   VITE_API_URL  = https://timelessbackend.onrender.com/api
//   VITE_MEDIA_URL = https://timelessbackend.onrender.com
//
// Vite bakes env vars at BUILD TIME — they must exist in Vercel before deploying.
// The fallback below is only used in local development.
// ──────────────────────────────────────────────────────────

const RAW_URL = import.meta.env.VITE_API_URL;

// Guard: ensure the URL always ends with /api
// Common mistake: setting VITE_API_URL=https://backend.onrender.com (missing /api)
const ensureApiSuffix = (url) => {
  const stripped = url.replace(/\/+$/, ""); // remove trailing slashes
  return stripped.endsWith("/api") ? stripped : `${stripped}/api`;
};

const BASE_URL = RAW_URL
  ? ensureApiSuffix(RAW_URL)
  : "http://localhost:4000/api";

// Log on startup — open browser console to confirm the right URL is used
if (typeof window !== "undefined") {
  console.log("[api] BASE_URL →", BASE_URL);
  if (!RAW_URL) {
    console.warn(
      "[api] ⚠️  VITE_API_URL not set — using localhost fallback. Set it in Vercel env vars!",
    );
  }
}

// ── Authenticated instance ─────────────────────────────────
// Sends JWT cookie + Bearer token — used for auth/orders/payments/admin
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
  timeout: 60000, // 60s — Render free tier cold-start can take ~30-50s
});

// ── Public instance ────────────────────────────────────────
// No credentials — used for GET /products (avoids CORS wildcard restriction)
const publicApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
  timeout: 60000,
});

// ── Request interceptor — attach Bearer token if present ──
const attachToken = (config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
};
api.interceptors.request.use(attachToken, (e) => Promise.reject(e));

// ── Response interceptor ───────────────────────────────────
const handleError = (error) => {
  if (!error.response) {
    console.error("[api] Network error hitting:", BASE_URL, "—", error.message);
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

// ─── Auth ──────────────────────────────────────────────────
export const authAPI = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  logout: () => api.post("/auth/logout"),
  getMe: () => api.get("/auth/me"),
  forgotPassword: (email) => api.post("/auth/forgot-password", { email }),
  resetPassword: (token, password) =>
    api.post("/auth/reset-password", { token, password }),
};

// ─── Products ──────────────────────────────────────────────
export const productAPI = {
  getAll: (params) => publicApi.get("/products", { params }),
  getById: (id) => publicApi.get(`/products/${id}`),
  addReview: (id, data) => api.post(`/products/${id}/reviews`, data),
  create: (data) => api.post("/products", data),
  update: (id, data) => api.patch(`/products/${id}`, data),
  remove: (id) => api.delete(`/products/${id}`),
};

// ─── Orders ────────────────────────────────────────────────
export const orderAPI = {
  getMine: () => api.get("/orders/mine"),
  getById: (id) => api.get(`/orders/${id}`),
  getAll: () => api.get("/orders"),
  updateStatus: (id, status) => api.patch(`/orders/${id}/status`, { status }),
};

// ─── Payments ──────────────────────────────────────────────
export const paymentAPI = {
  createIntent: (payload) => api.post("/payments/create-intent", payload),
  confirm: (paymentIntentId) =>
    api.post("/payments/confirm", { paymentIntentId }),
};

export default api;
