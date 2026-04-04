// ProductPage.jsx — refined grid layout with category filters + cart controls
import { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { decrease, increase, removeItem } from "../lib/features/cart/cartSlice";
import { productData } from "../assets/assets";
import { Link } from "react-router-dom";

const CATEGORIES = ["All", "Men", "Women", "Unisex"];
const SORT_OPTIONS = ["Latest", "Price: Low to High", "Price: High to Low"];

const ProductPage = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("Latest");
  const [sortOpen, setSortOpen] = useState(false);

  const cartMap = cartItems.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {});

  const filtered = productData
    .filter((p) => category === "All" || p.category === category)
    .sort((a, b) => {
      if (sort === "Price: Low to High") return a.price - b.price;
      if (sort === "Price: High to Low") return b.price - a.price;
      return 0;
    });

  return (
    <div className="bg-[#faf8f6] min-h-screen font-['Jost',sans-serif] pt-28 pb-20">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,400&family=Jost:wght@300;400;500&display=swap');`}</style>

      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        {/* Page Header */}
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
          {/* Category filters */}
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
              {sort}
              <RiArrowDropDownLine
                className={`text-xl transition-transform duration-200 ${sortOpen ? "rotate-180" : ""}`}
              />
            </button>
            {sortOpen && (
              <div className="absolute right-0 top-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl z-20 overflow-hidden min-w-[180px]">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setSort(opt);
                      setSortOpen(false);
                    }}
                    className={`w-full text-left text-[0.75rem] px-5 py-3 transition-colors ${
                      sort === opt
                        ? "text-pink-700 bg-pink-50"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Results count */}
        <p className="text-[0.7rem] text-gray-400 tracking-wide mb-6">
          {filtered.length} {filtered.length === 1 ? "product" : "products"}{" "}
          found
        </p>

        {/* Product Grid */}
        {filtered.length === 0 ? (
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
            {filtered.map((product) => {
              const inCart = cartMap[product.id];
              return (
                <div key={product.id} className="group">
                  {/* Image wrapper */}
                  <div className="relative overflow-hidden rounded-xl bg-gray-100 mb-3">
                    <Link to={`/product/${product.id}`}>
                      <img
                        src={product.img}
                        alt={product.title}
                        className="w-full h-[260px] object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </Link>

                    {/* Cart controls overlay */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[90%]">
                      {!inCart ? (
                        <button
                          onClick={() => dispatch(increase(product.id))}
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
                                dispatch(removeItem(product.id));
                              else dispatch(decrease(product.id));
                            }}
                            className="text-pink-700 hover:text-pink-900 transition-colors"
                          >
                            <CiCircleMinus className="text-xl" />
                          </button>
                          <span className="text-sm font-semibold text-gray-800 min-w-[1.5rem] text-center">
                            {inCart.amount}
                          </span>
                          <button
                            onClick={() => dispatch(increase(product.id))}
                            className="text-pink-700 hover:text-pink-900 transition-colors"
                          >
                            <CiCirclePlus className="text-xl" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Badge if in cart */}
                    {inCart && (
                      <div className="absolute top-3 right-3 bg-pink-600 text-white text-[0.6rem] font-semibold tracking-wide px-2 py-1 rounded-full">
                        {inCart.amount} in bag
                      </div>
                    )}
                  </div>

                  {/* Product info */}
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-['Cormorant_Garamond',serif] text-lg text-gray-800 font-medium leading-tight hover:text-pink-700 transition-colors">
                      {product.title}
                    </h3>
                  </Link>
                  {product.text && (
                    <p className="text-[0.72rem] text-gray-400 mt-0.5 truncate">
                      {product.text}
                    </p>
                  )}
                  <p className="text-sm font-semibold text-pink-700 mt-1">
                    GH₵ {Number(product.price).toLocaleString()}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
