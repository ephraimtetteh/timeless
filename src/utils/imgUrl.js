// src/utils/imgUrl.js
// Converts a stored image path like "/products/file.png" into a full URL.
//
// In development the Vite proxy forwards /products/* to the backend,
// so a plain "/products/file.png" works in <img src>.
//
// In production, set VITE_MEDIA_URL to your CDN or backend domain,
// e.g. VITE_MEDIA_URL=https://api.yoursite.com
//
// Usage:
//   import { imgUrl } from "../utils/imgUrl"
//   <img src={imgUrl(product.img)} />

const MEDIA_BASE = import.meta.env.VITE_MEDIA_URL || "";

export const imgUrl = (path) => {
  if (!path) return "/placeholder.jpg";
  // Already an absolute URL (http/https) — return as-is
  if (path.startsWith("http")) return path;
  // Prepend media base if set, otherwise rely on Vite proxy (dev) or same origin (prod)
  return `${MEDIA_BASE}${path}`;
};

export default imgUrl;
