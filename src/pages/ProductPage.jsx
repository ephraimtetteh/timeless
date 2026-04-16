// ProductPage.jsx — fetches from API via Redux productSlice
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { fetchProducts } from "../lib/features/products/productSlice";
import {
  addToCart,
  increase,
  decrease,
  removeItem,
} from "../lib/features/cart/cartSlice";
import imgUrl from "../utils/imgUrl";

const CATEGORIES = ["All", "Men", "Women", "Unisex"];
const SORT_OPTIONS = [
  { label: "Latest", value: "latest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Top Rated", value: "rating" },
];

// Star display
const Stars = ({ rating = 0 }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        className={`w-3 h-3 ${i < Math.round(rating) ? "text-yellow-400" : "text-gray-200"}`}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const ProductPage = () => {
  const dispatch = useDispatch();
  const {
    items: products,
    total,
    status,
    error,
  } = useSelector((s) => s.products);
  const { cartItems } = useSelector((s) => s.cart);

  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("latest");
  const [sortOpen, setSortOpen] = useState(false);

  // Build a map for O(1) cart lookup by _id
  const cartMap = cartItems.reduce((acc, item) => {
    acc[item._id || item.id] = item;
    return acc;
  }, {});

  useEffect(() => {
    dispatch(
      fetchProducts({
        category: category === "All" ? undefined : category,
        sort,
      }),
    );
  }, [category, sort, dispatch]);

  const sortLabel =
    SORT_OPTIONS.find((o) => o.value === sort)?.label || "Latest";

  return (
    <div className="bg-[#faf8f6] min-h-screen font-['Jost',sans-serif] pt-28 pb-20">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,400&family=Jost:wght@300;400;500&display=swap');`}</style>

      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        {/* Header */}
        <div className="mb-10">
          <p className="text-[0.65rem] tracking-[0.3em] uppercase text-pink-500 mb-2">
            Browse
          </p>
          <h1 className="font-['Cormorant_Garamond',serif] text-5xl text-gray-900 font-light">
            Our Fragrances
          </h1>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-gray-200">
          {/* Category pills */}
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`text-[0.7rem] tracking-widest uppercase px-4 py-2 rounded-full border transition-all duration-200 ${
                  category === cat
                    ? "bg-pink-700 border-pink-700 text-white"
                    : "border-gray-300 text-gray-500 hover:border-pink-300 hover:text-pink-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort dropdown */}
          <div className="relative">
            <button
              onClick={() => setSortOpen((v) => !v)}
              className="flex items-center gap-2 text-[0.7rem] tracking-widest uppercase text-gray-500 border border-gray-300 px-4 py-2 rounded-full hover:border-pink-300 transition-colors"
            >
              {sortLabel}
              <RiArrowDropDownLine
                className={`text-xl transition-transform duration-200 ${sortOpen ? "rotate-180" : ""}`}
              />
            </button>
            {sortOpen && (
              <div className="absolute right-0 top-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl z-20 overflow-hidden min-w-[190px]">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setSort(opt.value);
                      setSortOpen(false);
                    }}
                    className={`w-full text-left text-[0.75rem] px-5 py-3 transition-colors ${
                      sort === opt.value
                        ? "text-pink-700 bg-pink-50"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Status */}
        {status === "loading" && (
          <div className="flex justify-center py-24">
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
        )}

        {status === "failed" && (
          <div className="text-center py-24">
            <p className="text-gray-500 mb-3">{error}</p>
            <button
              onClick={() => dispatch(fetchProducts({ category, sort }))}
              className="text-sm text-pink-600 underline"
            >
              Try again
            </button>
          </div>
        )}

        {status === "succeeded" && (
          <>
            <p className="text-[0.7rem] text-gray-400 tracking-wide mb-6">
              {total} {total === 1 ? "product" : "products"} found
            </p>

            {products.length === 0 ? (
              <div className="text-center py-24">
                <p className="font-['Cormorant_Garamond',serif] text-3xl text-gray-400 italic">
                  No fragrances found
                </p>
                <button
                  onClick={() => setCategory("All")}
                  className="mt-4 text-sm text-pink-600 underline"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {products.map((product) => {
                  const cartId = product._id;
                  const inCart = cartMap[cartId];
                  return (
                    <div key={product._id} className="group">
                      {/* Image */}
                      <div className="relative overflow-hidden rounded-xl bg-gray-100 mb-3">
                        <Link to={`/product/${product._id}`}>
                          <img
                            src={imgUrl(product.img || product.images?.[0])}
                            alt={product.title}
                            className="w-full h-[260px] object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </Link>

                        {/* Add / qty controls */}
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[90%]">
                          {!inCart ? (
                            <button
                              onClick={() => dispatch(addToCart(product))}
                              className="w-full py-2 bg-white/90 backdrop-blur-sm rounded-full text-[0.7rem] tracking-widest uppercase text-pink-700 font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-pink-700 hover:text-white flex items-center justify-center gap-2"
                            >
                              <CiCirclePlus className="text-lg" />
                              Add to Bag
                            </button>
                          ) : (
                            <div className="flex items-center justify-between bg-white/90 backdrop-blur-sm rounded-full px-4 py-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300">
                              <button
                                onClick={() => {
                                  if (inCart.amount === 1)
                                    dispatch(removeItem(cartId));
                                  else dispatch(decrease(cartId));
                                }}
                                className="text-pink-700 hover:text-pink-900 transition-colors"
                              >
                                <CiCircleMinus className="text-xl" />
                              </button>
                              <span className="text-sm font-semibold text-gray-800 min-w-[1.5rem] text-center">
                                {inCart.amount}
                              </span>
                              <button
                                onClick={() => dispatch(increase(cartId))}
                                className="text-pink-700 hover:text-pink-900 transition-colors"
                              >
                                <CiCirclePlus className="text-xl" />
                              </button>
                            </div>
                          )}
                        </div>

                        {inCart && (
                          <div className="absolute top-3 right-3 bg-pink-600 text-white text-[0.6rem] font-semibold tracking-wide px-2 py-1 rounded-full">
                            {inCart.amount} in bag
                          </div>
                        )}
                        {product.isFeatured && (
                          <div className="absolute top-3 left-3 bg-yellow-400 text-yellow-900 text-[0.55rem] font-bold tracking-widest uppercase px-2 py-1 rounded-full">
                            Featured
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <Link to={`/product/${product._id}`}>
                        <h3 className="font-['Cormorant_Garamond',serif] text-lg text-gray-800 font-medium leading-tight hover:text-pink-700 transition-colors">
                          {product.title}
                        </h3>
                      </Link>
                      {product.brand && (
                        <p className="text-[0.65rem] text-pink-400 uppercase tracking-widest mt-0.5">
                          {product.brand}
                        </p>
                      )}
                      {product.text && (
                        <p className="text-[0.72rem] text-gray-400 mt-0.5 truncate">
                          {product.text}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-1.5">
                        <p className="text-sm font-semibold text-pink-700">
                          GH₵ {Number(product.price).toLocaleString()}
                        </p>
                        {product.numReviews > 0 && (
                          <div className="flex items-center gap-1">
                            <Stars rating={product.rating} />
                            <span className="text-[0.6rem] text-gray-400">
                              ({product.numReviews})
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
