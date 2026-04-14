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
  getProducts: (params) => api.get("/admin/products", { params }),
  createProduct: (data) => api.post("/admin/products", data),
  updateProduct: (id, data) => api.patch(`/admin/products/${id}`, data),
  deleteProduct: (id) => api.delete(`/admin/products/${id}`),
};
