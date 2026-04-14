// src/pages/admin/AdminProducts.jsx
import { useEffect, useState, useCallback } from "react";
import { adminAPI } from "../../services/adminAPI";
import { FiPlus, FiEdit2, FiTrash2, FiX, FiCheck } from "react-icons/fi";

const EMPTY_FORM = {
  title: "",
  text: "",
  description: "",
  price: "",
  img: "",
  category: "Unisex",
  type: "",
  size: "",
  stock: "",
};

const CATEGORIES = ["Men", "Women", "Unisex"];

// ── Modal ─────────────────────────────────────────────────
const ProductModal = ({ product, onClose, onSave }) => {
  const [form, setForm] = useState(product || EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const isEdit = !!product?._id;

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      };
      if (isEdit) {
        await adminAPI.updateProduct(product._id, payload);
      } else {
        await adminAPI.createProduct(payload);
      }
      onSave();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save product.");
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full bg-[#252525] border border-white/10 text-gray-200 text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-pink-700 transition-colors placeholder-gray-700";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
    >
      <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <h3 className="text-white font-light">
            {isEdit ? "Edit Product" : "New Product"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-white transition-colors"
          >
            <FiX size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          {error && (
            <div className="bg-red-900/20 border border-red-900/50 text-red-400 text-sm px-4 py-2 rounded-xl">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className="text-[0.65rem] tracking-widest uppercase text-gray-600 mb-1.5 block">
                Title *
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                placeholder="Product name"
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-[0.65rem] tracking-widest uppercase text-gray-600 mb-1.5 block">
                Price (GH₵) *
              </label>
              <input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                placeholder="0.00"
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-[0.65rem] tracking-widest uppercase text-gray-600 mb-1.5 block">
                Stock
              </label>
              <input
                name="stock"
                type="number"
                value={form.stock}
                onChange={handleChange}
                min="0"
                placeholder="0"
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-[0.65rem] tracking-widest uppercase text-gray-600 mb-1.5 block">
                Category
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className={inputClass}
              >
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[0.65rem] tracking-widest uppercase text-gray-600 mb-1.5 block">
                Type
              </label>
              <input
                name="type"
                value={form.type}
                onChange={handleChange}
                placeholder="e.g. Eau de Parfum"
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-[0.65rem] tracking-widest uppercase text-gray-600 mb-1.5 block">
                Size
              </label>
              <input
                name="size"
                value={form.size}
                onChange={handleChange}
                placeholder="e.g. 100ml"
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-[0.65rem] tracking-widest uppercase text-gray-600 mb-1.5 block">
                Image URL
              </label>
              <input
                name="img"
                value={form.img}
                onChange={handleChange}
                placeholder="/products/image.jpg"
                className={inputClass}
              />
            </div>
            <div className="col-span-2">
              <label className="text-[0.65rem] tracking-widests uppercase text-gray-600 mb-1.5 block">
                Short Description
              </label>
              <input
                name="text"
                value={form.text}
                onChange={handleChange}
                placeholder="Brief subtitle"
                className={inputClass}
              />
            </div>
            <div className="col-span-2">
              <label className="text-[0.65rem] tracking-widest uppercase text-gray-600 mb-1.5 block">
                Full Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                placeholder="Full product description..."
                className={`${inputClass} resize-none`}
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 border border-white/10 text-gray-500 hover:text-white rounded-xl text-sm transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-2.5 bg-pink-800 hover:bg-pink-700 text-white rounded-xl text-sm transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {saving ? (
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
                  Saving…
                </>
              ) : (
                <>
                  <FiCheck size={14} />
                  {isEdit ? "Save Changes" : "Create Product"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ── Delete confirm ────────────────────────────────────────
const DeleteConfirm = ({ product, onCancel, onConfirm }) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center p-4"
    style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
  >
    <div className="bg-[#1a1a1a] border border-red-900/30 rounded-2xl p-6 max-w-sm w-full text-center">
      <div className="w-12 h-12 bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <FiTrash2 size={20} className="text-red-400" />
      </div>
      <h3 className="text-white font-light mb-2">Delete Product?</h3>
      <p className="text-gray-500 text-sm mb-6">
        "<span className="text-gray-300">{product.title}</span>" will be
        permanently removed.
      </p>
      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 py-2.5 border border-white/10 text-gray-400 hover:text-white rounded-xl text-sm transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={() => onConfirm(product._id)}
          className="flex-1 py-2.5 bg-red-800 hover:bg-red-700 text-white rounded-xl text-sm transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);

// ── Main page ─────────────────────────────────────────────
const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, pages: 1 });
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null); // null | "create" | product object
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("all");

  const fetchProducts = useCallback(
    async (page = 1) => {
      setLoading(true);
      try {
        const { data } = await adminAPI.getProducts({
          page,
          limit: 12,
          category: categoryFilter === "all" ? undefined : categoryFilter,
        });
        setProducts(data.products);
        setPagination(data.pagination);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [categoryFilter],
  );

  useEffect(() => {
    fetchProducts(1);
  }, [fetchProducts]);

  const handleDelete = async (id) => {
    try {
      await adminAPI.deleteProduct(id);
      setDeleteTarget(null);
      fetchProducts(pagination.page);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = () => {
    setModal(null);
    fetchProducts(pagination.page);
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Modals */}
      {modal && (
        <ProductModal
          product={modal === "create" ? null : modal}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}
      {deleteTarget && (
        <DeleteConfirm
          product={deleteTarget}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={handleDelete}
        />
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white text-lg font-light">Products</h2>
          <p className="text-gray-600 text-[0.65rem] tracking-widest uppercase">
            {pagination.total} total
          </p>
        </div>
        <button
          onClick={() => setModal("create")}
          className="flex items-center gap-2 bg-pink-800 hover:bg-pink-700 text-white text-[0.7rem] tracking-wide px-4 py-2 rounded-full transition-colors"
        >
          <FiPlus size={14} /> Add Product
        </button>
      </div>

      {/* Category filter */}
      <div className="flex gap-2">
        {["all", ...CATEGORIES].map((c) => (
          <button
            key={c}
            onClick={() => setCategoryFilter(c)}
            className={`text-[0.65rem] tracking-widest uppercase px-3 py-1.5 rounded-full border transition-all ${
              categoryFilter === c
                ? "bg-pink-900/40 border-pink-800 text-pink-400"
                : "border-white/10 text-gray-500 hover:text-gray-300"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex justify-center py-16">
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-pink-600 animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-[#1a1a1a] border border-white/5 rounded-2xl overflow-hidden group hover:border-white/10 transition-colors"
            >
              {/* Image */}
              <div className="aspect-square bg-[#252525] relative overflow-hidden">
                {product.img ? (
                  <img
                    src={product.img}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-700 text-4xl">
                    🌸
                  </div>
                )}
                {/* Actions overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button
                    onClick={() => setModal(product)}
                    className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                  >
                    <FiEdit2 size={14} />
                  </button>
                  <button
                    onClick={() => setDeleteTarget(product)}
                    className="w-9 h-9 bg-red-900/60 hover:bg-red-800 rounded-full flex items-center justify-center text-red-300 transition-colors"
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>
                {/* Category badge */}
                <span className="absolute top-2 left-2 text-[0.55rem] tracking-widest uppercase bg-black/60 text-gray-300 px-2 py-1 rounded-full">
                  {product.category}
                </span>
              </div>

              {/* Info */}
              <div className="p-3">
                <p className="text-sm text-gray-200 truncate">
                  {product.title}
                </p>
                <p className="text-[0.65rem] text-gray-600 truncate mt-0.5">
                  {product.type}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-pink-400 text-sm font-medium">
                    GH₵ {Number(product.price).toLocaleString()}
                  </p>
                  <span
                    className={`text-[0.6rem] tracking-wide px-2 py-0.5 rounded-full ${
                      product.stock > 0
                        ? "bg-emerald-900/30 text-emerald-500"
                        : "bg-red-900/30 text-red-500"
                    }`}
                  >
                    {product.stock > 0
                      ? `${product.stock} in stock`
                      : "Out of stock"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-2">
          {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(
            (p) => (
              <button
                key={p}
                onClick={() => fetchProducts(p)}
                className={`w-8 h-8 rounded-lg text-sm transition-colors ${
                  pagination.page === p
                    ? "bg-pink-800 text-white"
                    : "border border-white/10 text-gray-500 hover:text-white"
                }`}
              >
                {p}
              </button>
            ),
          )}
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
