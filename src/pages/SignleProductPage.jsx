// SingleProductPage.jsx — fetches product by _id from API
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaStar,
  FaRegStar,
} from "react-icons/fa";
import {
  fetchProductById,
  submitReview,
} from "../lib/features/products/productSlice";
import { addToCart } from "../lib/features/cart/cartSlice";
import imgUrl from "../utils/imgUrl";

// ── Star rating component ─────────────────────────────────
const StarRating = ({ value, onChange }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((n) => (
      <button key={n} type="button" onClick={() => onChange(n)}>
        {n <= value ? (
          <FaStar className="text-yellow-400 text-xl" />
        ) : (
          <FaRegStar className="text-gray-300 text-xl" />
        )}
      </button>
    ))}
  </div>
);

const SingleProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    currentProduct: product,
    singleStatus,
    error,
  } = useSelector((s) => s.products);
  const { isAuthenticated } = useSelector((s) => s.auth);

  const [selectedImage, setSelectedImage] = useState(0);
  const [added, setAdded] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewMsg, setReviewMsg] = useState("");

  useEffect(() => {
    if (id) dispatch(fetchProductById(id));
  }, [id, dispatch]);

  // Reset image index when product changes
  useEffect(() => {
    setSelectedImage(0);
  }, [product?._id]);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    dispatch(addToCart(product));
    navigate("/place-order");
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setReviewSubmitting(true);
    setReviewMsg("");
    const result = await dispatch(
      submitReview({
        id: product._id,
        rating: reviewRating,
        comment: reviewComment,
      }),
    );
    if (submitReview.fulfilled.match(result)) {
      setReviewComment("");
      setReviewRating(5);
      setReviewMsg("Review submitted — thank you!");
    } else {
      setReviewMsg(result.payload || "Could not submit review.");
    }
    setReviewSubmitting(false);
  };

  // ── Loading ───────────────────────────────────────────
  if (singleStatus === "loading")
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf8f6]">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2.5 h-2.5 rounded-full bg-pink-400 animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    );

  // ── Error / not found ─────────────────────────────────
  if (singleStatus === "failed" || !product)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#faf8f6]">
        <p className="text-gray-500">{error || "Product not found."}</p>
        <button
          onClick={() => navigate("/products")}
          className="text-pink-600 underline text-sm"
        >
          Back to products
        </button>
      </div>
    );

  const images = product.images?.length
    ? product.images
    : [product.img].filter(Boolean);

  return (
    <div className="bg-[#faf8f6] min-h-screen font-['Jost',sans-serif]">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,400&family=Jost:wght@300;400;500&display=swap');`}</style>

      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-12 mt-16">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* ── Image gallery ──────────────────────────── */}
          <div className="flex flex-col gap-4">
            <div className="aspect-square rounded-2xl overflow-hidden border border-gray-100 bg-gray-50">
              <img
                src={imgUrl(images[selectedImage])}
                alt={product.title}
                className="w-full h-full object-cover transition-all duration-300"
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-24 h-24 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === i
                        ? "border-pink-400"
                        : "border-gray-100"
                    }`}
                  >
                    <img
                      src={imgUrl(src)}
                      alt={`View ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Product info ────────────────────────────── */}
          <div className="flex flex-col gap-5">
            {product.brand && (
              <p className="text-[0.65rem] font-semibold text-pink-400 uppercase tracking-[0.25em]">
                {product.brand}
              </p>
            )}
            <h1
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
              className="text-4xl text-gray-900 font-light leading-tight"
            >
              {product.title}
            </h1>

            {/* Rating */}
            {product.numReviews > 0 && (
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar
                      key={i}
                      className={
                        i < Math.round(product.rating)
                          ? "text-yellow-400"
                          : "text-gray-200"
                      }
                      size={14}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-400">
                  {product.rating} ({product.numReviews} review
                  {product.numReviews !== 1 ? "s" : ""})
                </span>
              </div>
            )}

            {/* Price */}
            <div className="border-t border-b border-gray-100 py-4">
              <p
                className="text-3xl font-light text-pink-600"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                GH₵ {Number(product.price).toLocaleString()}.00
              </p>
              <p
                className={`text-[0.7rem] tracking-widest uppercase mt-1 ${
                  product.stock > 0 ? "text-emerald-500" : "text-red-400"
                }`}
              >
                {product.stock > 0
                  ? `${product.stock} in stock`
                  : "Out of stock"}
              </p>
            </div>

            {/* Attributes */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Category", value: product.category },
                { label: "Type", value: product.type || "—" },
                { label: "Size", value: product.size || "—" },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="bg-white border border-gray-100 rounded-xl p-3 text-center"
                >
                  <p className="text-[0.6rem] text-gray-400 tracking-widest uppercase mb-1">
                    {label}
                  </p>
                  <p className="text-sm font-medium text-gray-700">{value}</p>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`flex-1 py-4 border-2 rounded-full font-medium text-sm transition-all ${
                  added
                    ? "border-green-400 text-green-500"
                    : product.stock === 0
                      ? "border-gray-200 text-gray-300 cursor-not-allowed"
                      : "border-pink-400 text-pink-500 hover:bg-pink-50"
                }`}
              >
                {added ? "✓ Added to Bag" : "Add to Bag"}
              </button>
              <button
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className="flex-1 py-4 bg-pink-700 hover:bg-pink-800 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium rounded-full transition-colors text-sm"
              >
                Buy Now →
              </button>
            </div>

            {/* Description */}
            {product.description && (
              <div className="pt-2">
                <p className="text-[0.65rem] tracking-[0.25em] uppercase text-gray-400 mb-2">
                  Description
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {/* Social */}
            <div className="flex items-center gap-3 pt-1">
              <span className="text-[0.65rem] text-gray-400 tracking-widest uppercase">
                Share
              </span>
              {[FaFacebookF, FaInstagram, FaTwitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 border border-pink-100 rounded-full flex items-center justify-center text-pink-300 hover:bg-pink-50 hover:border-pink-300 hover:text-pink-500 transition-all"
                >
                  <Icon size={12} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Reviews section ──────────────────────────── */}
        <div className="mt-16 border-t border-gray-100 pt-12">
          <p className="text-[0.65rem] tracking-[0.3em] uppercase text-pink-500 mb-2">
            Customer Reviews
          </p>
          <h2
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
            className="text-3xl text-gray-900 font-light mb-8"
          >
            What People Are Saying
          </h2>

          <div className="grid lg:grid-cols-2 gap-10">
            {/* Review list */}
            <div className="flex flex-col gap-5">
              {product.reviews?.length === 0 && (
                <p className="text-gray-400 text-sm italic">
                  No reviews yet — be the first to share your thoughts.
                </p>
              )}
              {product.reviews?.map((review, i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-100 rounded-2xl p-5"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-gray-800 text-sm">
                      {review.name}
                    </p>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <FaStar
                          key={j}
                          size={11}
                          className={
                            j < review.rating
                              ? "text-yellow-400"
                              : "text-gray-200"
                          }
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {review.comment}
                  </p>
                  <p className="text-[0.65rem] text-gray-300 mt-2">
                    {new Date(review.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              ))}
            </div>

            {/* Write a review */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Write a Review
              </h3>

              {!isAuthenticated ? (
                <p className="text-sm text-gray-500">
                  Please{" "}
                  <a href="/login" className="text-pink-600 underline">
                    sign in
                  </a>{" "}
                  to leave a review.
                </p>
              ) : (
                <form
                  onSubmit={handleReviewSubmit}
                  className="flex flex-col gap-4"
                >
                  <div>
                    <p className="text-[0.65rem] tracking-widest uppercase text-gray-400 mb-2">
                      Your Rating
                    </p>
                    <StarRating
                      value={reviewRating}
                      onChange={setReviewRating}
                    />
                  </div>
                  <div>
                    <p className="text-[0.65rem] tracking-widest uppercase text-gray-400 mb-2">
                      Your Review
                    </p>
                    <textarea
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      required
                      rows={4}
                      placeholder="Share your experience with this fragrance..."
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-400 transition-all resize-none"
                    />
                  </div>
                  {reviewMsg && (
                    <p
                      className={`text-sm ${reviewMsg.includes("thank") ? "text-green-600" : "text-red-500"}`}
                    >
                      {reviewMsg}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={reviewSubmitting}
                    className="py-3 bg-pink-700 hover:bg-pink-800 disabled:opacity-50 text-white text-[0.75rem] tracking-widest uppercase rounded-full transition-colors"
                  >
                    {reviewSubmitting ? "Submitting…" : "Submit Review"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;
