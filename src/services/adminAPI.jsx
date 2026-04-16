// src/services/adminAPI.js
import api from "./api";

export const adminAPI = {
  // Analytics
  getAnalytics: () => api.get("/admin/analytics"),

  // Orders
  getOrders: (params) => api.get("/admin/orders", { params }),
  updateOrderStatus: (id, status) =>
    api.patch(`/admin/orders/${id}/status`, { status }),

  // Users
  getUsers: (params) => api.get("/admin/users", { params }),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),

  // Products
  // GET — normal JSON
  getProducts: (params) => api.get("/admin/products", { params }),

  // POST/PATCH — FormData (contains image file), let browser set Content-Type with boundary
  createProduct: (formData) =>
    api.post("/admin/products", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  updateProduct: (id, formData) =>
    api.patch(`/admin/products/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  deleteProduct: (id) => api.delete(`/admin/products/${id}`),
};
