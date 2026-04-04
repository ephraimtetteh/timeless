// SingleProductPage.jsx — improved product layout
import { useState } from "react";
import { useDispatch } from "react-redux";
import { productImages } from "../assets/assets";
import { FaFacebookF, FaInstagram, FaTwitter, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { increase } from "../lib/features/cart/cartSlice";

// Example product — replace with dynamic data from route params / API
const product = {
  id: 1,
  title: "Gisada Tonka Cola",
  brand: "Gisada",
  gender: "Unisex",
  type: "Eau de Parfum",
  size: "120 ml",
  price: 1600,
  rating: 4,
  reviewCount: 3,
  images: [productImages.gisade, productImages.gisade, productImages.gisade],
  description:
    "Gisada Tonka Cola Eau de Parfum is a vibrant, fun, and energetic fragrance that embodies energy and charm. It features top notes of bergamot, lemon, orange and ginger, a heart of mint and cola, and a rich base of tonka bean, amber and vanilla. Perfect for both daytime and evening wear, presented in a sleek collector's bottle.",
};

const SingleProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    dispatch(increase(product.id));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handlePlaceOrder = () => {
    dispatch(increase(product.id));
    navigate("/place-order");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-8 py-12 mt-16">
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Image Gallery */}
        <div className="flex flex-col gap-4">
          <div className="aspect-square rounded-2xl overflow-hidden border border-gray-100 bg-gray-50">
            <img
              src={product.images[selectedImage]}
              alt={product.title}
              className="w-full h-full object-cover transition-all duration-300"
            />
          </div>
          <div className="flex gap-3">
            {product.images.map((src, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`w-24 h-24 rounded-xl overflow-hidden border-2 transition-all ${
                  selectedImage === i ? "border-pink-400" : "border-gray-100"
                }`}
              >
                <img
                  src={src}
                  alt={`View ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-sm font-semibold text-pink-400 uppercase tracking-widest mb-1">
              {product.brand}
            </p>
            <h1 className="text-4xl font-bold text-gray-800 leading-tight">
              {product.title}
            </h1>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar
                  key={i}
                  className={
                    i < product.rating ? "text-yellow-400" : "text-gray-200"
                  }
                  size={16}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">
              ({product.reviewCount} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="border-t border-b border-gray-100 py-4">
            <p className="text-3xl font-bold text-pink-600">
              GH₵ {product.price.toLocaleString()}.00
            </p>
          </div>

          {/* Attributes */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Gender", value: product.gender },
              { label: "Type", value: product.type },
              { label: "Size", value: product.size },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="bg-gray-50 rounded-xl p-3 text-center"
              >
                <p className="text-xs text-gray-400 mb-1">{label}</p>
                <p className="text-sm font-semibold text-gray-700">{value}</p>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={handleAddToCart}
              className={`flex-1 py-4 border-2 rounded-full font-semibold transition-all text-sm ${
                added
                  ? "border-green-400 text-green-500"
                  : "border-pink-400 text-pink-500 hover:bg-pink-50"
              }`}
            >
              {added ? "✓ Added to Bag" : "Add to Bag"}
            </button>
            <button
              onClick={handlePlaceOrder}
              className="flex-1 py-4 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-full transition-colors text-sm"
            >
              Buy Now →
            </button>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-bold text-gray-800 mb-2 text-lg">
              Description
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Social */}
          <div className="flex items-center gap-3 pt-2">
            <span className="text-sm text-gray-400">Share:</span>
            {[
              { Icon: FaFacebookF, href: "#" },
              { Icon: FaInstagram, href: "#" },
              { Icon: FaTwitter, href: "#" },
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                className="w-9 h-9 border border-pink-200 rounded-full flex items-center justify-center text-pink-400 hover:bg-pink-50 hover:border-pink-400 transition-all"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;
