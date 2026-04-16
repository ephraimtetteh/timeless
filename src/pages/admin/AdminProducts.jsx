// src/pages/admin/AdminProducts.jsx
import { useEffect, useState, useCallback, useRef } from "react";
import { adminAPI } from "../../services/adminAPI";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiX,
  FiCheck,
  FiUpload,
  FiImage,
} from "react-icons/fi";
import imgUrl from "../../utils/imgUrl";

const CATEGORIES = ["Men", "Women", "Unisex"];

const EMPTY_FORM = {
  title: "",
  text: "",
  description: "",
  price: "",
  category: "Unisex",
  type: "",
  size: "",
  stock: "",
  isFeatured: false,
};

// ── Image upload preview ──────────────────────────────────
const ImageUploader = ({ currentImg, onFileChange }) => {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(currentImg || null);
  const [dragging, setDragging] = useState(false);

  const handleFile = (file) => {
    if (!file) return;
    const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowed.includes(file.type)) {
      alert("Only JPEG, PNG and WebP images are allowed.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be under 5MB.");
      return;
    }
    setPreview(URL.createObjectURL(file));
    onFileChange(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  return (
    <div>
      <label className="text-[0.65rem] tracking-widest uppercase text-gray-600 mb-2 block">
        Product Image
      </label>

      {/* Drop zone */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-xl overflow-hidden cursor-pointer
          transition-all duration-200 flex flex-col items-center justify-center gap-2
          ${dragging ? "border-pink-500 bg-pink-900/10" : "border-white/10 hover:border-white/20"}
          ${preview ? "h-40" : "h-32"}
        `}
      >
        {preview ? (
          <>
            <img
              src={preview}
              alt="Preview"
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            <div className="relative z-10 flex flex-col items-center gap-1 text-white">
              <FiUpload size={18} />
              <span className="text-[0.65rem] tracking-wide">
                Click or drop to replace
              </span>
            </div>
          </>
        ) : (
          <>
            <FiImage size={24} className="text-gray-600" />
            <p className="text-[0.7rem] text-gray-500">
              Click or drag image here
            </p>
            <p className="text-[0.6rem] text-gray-700">
              JPEG, PNG or WebP · max 5MB
            </p>
          </>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        className="hidden"
        onChange={(e) => handleFile(e.target.files[0])}
      />
    </div>
  );
};

// ── Product Modal ─────────────────────────────────────────
const ProductModal = ({ product, onClose, onSave }) => {
  const [form, setForm] = useState(
    product
      ? {
          title: product.title || "",
          text: product.text || "",
          description: product.description || "",
          price: product.price || "",
          category: product.category || "Unisex",
          type: product.type || "",
          size: product.size || "",
          stock: product.stock ?? "",
          isFeatured: product.isFeatured || false,
        }
      : EMPTY_FORM,
  );
  const [imageFile, setImageFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const isEdit = !!product?._id;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!imageFile && !isEdit) {
      setError("Please upload a product image.");
      return;
    }

    setSaving(true);
    try {
      // Use FormData so we can send the file
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (imageFile) fd.append("image", imageFile);

      if (isEdit) {
        await adminAPI.updateProduct(product._id, fd);
      } else {
        await adminAPI.createProduct(fd);
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
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
    >
      <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 sticky top-0 bg-[#1a1a1a] z-10">
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

        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-4 bg-red-900/20 border border-red-900/50 text-red-400 text-sm px-4 py-2.5 rounded-xl">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Image uploader — full width */}
            <div className="sm:col-span-2">
              <ImageUploader
                currentImg={product?.img}
                onFileChange={setImageFile}
              />
            </div>

            {/* Title */}
            <div className="sm:col-span-2">
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

            {/* Price + Stock */}
            <div>
              <label className="text-[0.65rem] tracking-widests uppercase text-gray-600 mb-1.5 block">
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
              <label className="text-[0.65rem] tracking-widests uppercase text-gray-600 mb-1.5 block">
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

            {/* Category + Type */}
            <div>
              <label className="text-[0.65rem] tracking-widests uppercase text-gray-600 mb-1.5 block">
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
              <label className="text-[0.65rem] tracking-widests uppercase text-gray-600 mb-1.5 block">
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

            {/* Size + Featured */}
            <div>
              <label className="text-[0.65rem] tracking-widests uppercase text-gray-600 mb-1.5 block">
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
            <div className="flex items-center gap-3 pt-5">
              <input
                type="checkbox"
                id="isFeatured"
                name="isFeatured"
                checked={form.isFeatured}
                onChange={handleChange}
                className="w-4 h-4 rounded accent-pink-600 cursor-pointer"
              />
              <label
                htmlFor="isFeatured"
                className="text-sm text-gray-400 cursor-pointer"
              >
                Feature on homepage
              </label>
            </div>

            {/* Short description */}
            <div className="sm:col-span-2">
              <label className="text-[0.65rem] tracking-widests uppercase text-gray-600 mb-1.5 block">
                Short Subtitle
              </label>
              <input
                name="text"
                value={form.text}
                onChange={handleChange}
                placeholder="One-line description shown on product cards"
                className={inputClass}
              />
            </div>

            {/* Full description */}
            <div className="sm:col-span-2">
              <label className="text-[0.65rem] tracking-widests uppercase text-gray-600 mb-1.5 block">
                Full Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                placeholder="Full product description..."
                className={`${inputClass} resize-none`}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-6">
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

// ── Delete Confirm ────────────────────────────────────────
const DeleteConfirm = ({ product, onCancel, onConfirm }) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center p-4"
    style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
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

// ── Main Page ─────────────────────────────────────────────
const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, pages: 1 });
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
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
      <div className="flex gap-2 flex-wrap">
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
      ) : products.length === 0 ? (
        <div className="text-center py-16 text-gray-700">No products found</div>
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
                    src={imgUrl(product.img)}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-700">
                    <FiImage size={32} />
                  </div>
                )}
                {/* Overlay actions */}
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
                <span className="absolute top-2 left-2 text-[0.55rem] tracking-widest uppercase bg-black/60 text-gray-300 px-2 py-1 rounded-full">
                  {product.category}
                </span>
                {product.isFeatured && (
                  <span className="absolute top-2 right-2 text-[0.55rem] bg-yellow-400/90 text-yellow-900 font-bold px-2 py-1 rounded-full">
                    Featured
                  </span>
                )}
              </div>
              {/* Info */}
              <div className="p-3">
                <p className="text-sm text-gray-200 truncate">
                  {product.title}
                </p>
                <p className="text-[0.65rem] text-gray-600 truncate mt-0.5">
                  {product.type || product.size}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-pink-400 text-sm font-medium">
                    GH₵ {Number(product.price).toLocaleString()}
                  </p>
                  <span
                    className={`text-[0.6rem] px-2 py-0.5 rounded-full ${
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
