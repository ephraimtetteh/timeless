// src/utils/imgUrl.js
// Builds a full image URL from a stored path like "/products/file.png"
//
// Dev:  Vite proxy forwards /products/* to localhost backend — no prefix needed
// Prod: VITE_MEDIA_URL = https://timelessbackend.onrender.com (no trailing slash)
//
// Usage: <img src={imgUrl(product.img)} />

const MEDIA_BASE = (import.meta.env.VITE_MEDIA_URL || "").replace(/\/$/, "");

export const imgUrl = (p) => {
  if (!p) return "/placeholder.jpg";
  if (p.startsWith("http")) return p; // already absolute
  return `${MEDIA_BASE}${p}`; // e.g. https://api.com/products/file.png
};

export default imgUrl;
