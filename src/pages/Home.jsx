// Home.jsx — Luxury editorial aesthetic with refined animations
import { useEffect, useRef } from "react";
import { FaRegCheckSquare } from "react-icons/fa";
import { Link } from "react-router-dom";
import { productImages } from "../assets/assets";

const Home = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.15 },
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-[#faf8f6] font-serif overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap');
        
        .font-display { font-family: 'Cormorant Garamond', serif; }
        .font-body { font-family: 'Jost', sans-serif; }

        .reveal { opacity: 0; transform: translateY(32px); transition: opacity 0.9s cubic-bezier(.16,1,.3,1), transform 0.9s cubic-bezier(.16,1,.3,1); }
        .reveal.animate-in { opacity: 1; transform: translateY(0); }
        .reveal-delay-1 { transition-delay: 0.15s; }
        .reveal-delay-2 { transition-delay: 0.3s; }
        .reveal-delay-3 { transition-delay: 0.45s; }

        .hero-img { 
          clip-path: polygon(0 0, 100% 0, 100% 92%, 88% 100%, 0 100%);
          transition: clip-path 0.6s ease;
        }
        .hero-img:hover {
          clip-path: polygon(0 0, 100% 0, 100% 96%, 92% 100%, 0 100%);
        }

        .category-card { overflow: hidden; }
        .category-card img { transition: transform 0.8s cubic-bezier(.16,1,.3,1); }
        .category-card:hover img { transform: scale(1.06); }
        .category-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 55%);
          pointer-events: none;
        }

        .btn-primary {
          font-family: 'Jost', sans-serif;
          letter-spacing: 0.18em;
          font-size: 0.7rem;
          font-weight: 500;
          text-transform: uppercase;
          position: relative;
          overflow: hidden;
        }
        .btn-primary::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 100%; height: 1px;
          background: white;
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.4s ease;
        }
        .btn-primary:hover::after { transform: scaleX(1); transform-origin: left; }

        .feature-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: 4rem;
          font-weight: 300;
          color: #f9a8d4;
          line-height: 1;
        }

        .marquee-track {
          display: flex;
          gap: 3rem;
          animation: marquee 22s linear infinite;
          white-space: nowrap;
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .divider-ornament {
          display: flex;
          align-items: center;
          gap: 1rem;
          color: #be185d;
        }
        .divider-ornament::before,
        .divider-ornament::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, transparent, #f9a8d4, transparent);
        }
      `}</style>

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="min-h-screen grid lg:grid-cols-2 items-stretch bg-[#faf8f6] pt-20"
      >
        {/* Text */}
        <div className="flex flex-col justify-center px-8 lg:px-20 py-16 lg:py-0">
          <p className="font-body text-[0.65rem] tracking-[0.3em] uppercase text-pink-500 mb-6 reveal">
            Timeless Beauty & Cosmetics
          </p>
          <h1 className="font-display text-[clamp(3rem,7vw,5.5rem)] leading-[1.05] text-gray-900 mb-6 reveal reveal-delay-1">
            Indulge in
            <br />
            <em className="text-pink-700">the Art</em>
            <br />
            of Scent
          </h1>
          <p className="font-body text-gray-500 text-[0.9rem] leading-relaxed max-w-sm mb-10 reveal reveal-delay-2">
            Where timeless elegance meets modern allure. Each fragrance is a
            masterpiece crafted to awaken your senses and leave a trail of
            unforgettable sophistication.
          </p>
          <div className="flex gap-4 reveal reveal-delay-3">
            <Link
              to="/products"
              className="btn-primary bg-pink-700 text-white px-8 py-4 hover:bg-pink-800 transition-colors duration-300"
            >
              Shop Now
            </Link>
            <Link
              to="/about"
              className="btn-primary border border-gray-300 text-gray-700 px-8 py-4 hover:border-pink-300 transition-colors duration-300"
            >
              Our Story
            </Link>
          </div>

          {/* Stats row */}
          <div className="mt-16 flex gap-10 reveal reveal-delay-3">
            {[
              ["200+", "Fragrances"],
              ["15k+", "Happy Clients"],
              ["100%", "Natural"],
            ].map(([n, l]) => (
              <div key={l}>
                <p className="font-display text-2xl text-pink-700 font-semibold">
                  {n}
                </p>
                <p className="font-body text-[0.7rem] tracking-widest uppercase text-gray-400">
                  {l}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative h-[60vh] lg:h-auto">
          <img
            className="hero-img w-full h-full object-cover object-center"
            src={productImages.perfume6}
            alt="Luxury fragrance"
          />
          {/* Floating badge */}
          <div className="absolute bottom-10 left-[-1.5rem] bg-white shadow-xl px-6 py-4 hidden lg:block">
            <p className="font-display text-sm italic text-pink-700">
              New Arrival
            </p>
            <p className="font-body text-[0.65rem] tracking-widest uppercase text-gray-500">
              Summer 2025 Collection
            </p>
          </div>
        </div>
      </section>

      {/* ── MARQUEE TICKER ─────────────────────────────────────────── */}
      <div className="py-4 border-y border-pink-100 overflow-hidden bg-white">
        <div className="marquee-track font-body text-[0.65rem] tracking-[0.25em] uppercase text-pink-400">
          {Array(8)
            .fill(null)
            .map((_, i) => (
              <span key={i} className="shrink-0">
                Luxury Fragrances &nbsp;·&nbsp; Natural Ingredients
                &nbsp;·&nbsp; Free Delivery over GH₵ 500 &nbsp;·&nbsp; New
                Arrivals Weekly &nbsp;·&nbsp;
              </span>
            ))}
        </div>
      </div>

      {/* ── CATEGORIES ─────────────────────────────────────────────── */}
      <section className="px-6 lg:px-20 py-20">
        <div className="text-center mb-12 reveal">
          <p className="font-body text-[0.65rem] tracking-[0.3em] uppercase text-pink-500 mb-3">
            Discover
          </p>
          <h2 className="font-display text-4xl lg:text-5xl text-gray-900">
            Shop by Collection
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              img: productImages.perfume6,
              label: "For Her",
              sub: "Floral & Soft",
            },
            {
              img: productImages.perfume4,
              label: "For Him",
              sub: "Bold & Woody",
            },
            {
              img: productImages.perfume3,
              label: "Unisex",
              sub: "Fresh & Balanced",
            },
          ].map(({ img, label, sub }, i) => (
            <div
              key={label}
              className={`category-card relative cursor-pointer rounded-lg reveal reveal-delay-${i + 1} ${i === 1 ? "sm:mt-10" : ""}`}
            >
              <img
                src={img}
                alt={label}
                className="w-full h-[420px] object-cover rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                <p className="font-body text-[0.6rem] tracking-widest uppercase text-pink-200 mb-1">
                  {sub}
                </p>
                <h3 className="font-display text-2xl text-white font-medium">
                  {label}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY US ─────────────────────────────────────────────────── */}
      <section className="bg-white py-20 lg:py-28 px-6 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 reveal">
            <div className="divider-ornament mb-6">
              <span className="font-body text-[0.65rem] tracking-[0.3em] uppercase text-pink-500">
                Our Promise
              </span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-gray-900 leading-tight">
              Why Settle for Ordinary
              <br />
              <em className="text-pink-700">When You Can Smell Divine?</em>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 items-start">
            {/* Left — image card */}
            <article className="relative rounded-2xl overflow-hidden reveal">
              <img
                className="w-full h-[70vh] object-cover"
                src={productImages.perfume3}
                alt="Fragrance"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent" />
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm rounded-xl p-5 flex gap-4 items-start">
                <FaRegCheckSquare className="text-pink-600 text-xl mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-display text-xl text-pink-700 font-semibold mb-1">
                    The Signature Aura
                  </h3>
                  <p className="font-body text-sm text-gray-600 leading-relaxed">
                    Infused with rare botanicals for a scent that lasts and a
                    feeling that lingers.
                  </p>
                </div>
              </div>
            </article>

            {/* Right — feature grid */}
            <div className="flex flex-col gap-4">
              <article className="flex gap-5 items-center bg-[#faf8f6] rounded-2xl p-6 reveal reveal-delay-1">
                <div className="shrink-0">
                  <img
                    src={productImages.perfume3}
                    alt=""
                    className="w-28 h-28 object-cover rounded-xl"
                  />
                </div>
                <div>
                  <h3 className="font-display text-2xl text-pink-700 font-semibold mb-2">
                    Consciously Crafted
                  </h3>
                  <p className="font-body text-sm text-gray-600 leading-relaxed">
                    Nature's finest notes blended with care into pure,
                    unforgettable luxury.
                  </p>
                </div>
              </article>

              <article className="bg-pink-700 rounded-2xl p-8 text-white reveal reveal-delay-2">
                <p className="font-body text-[0.65rem] tracking-[0.25em] uppercase text-pink-200 mb-3">
                  Our Commitment
                </p>
                <h3 className="font-display text-3xl font-medium mb-3">
                  100% Natural Essence
                </h3>
                <p className="font-body text-sm text-pink-100 leading-relaxed">
                  Pure ingredients, zero compromises. Dermatologically tested
                  and perfect for{" "}
                  <strong className="text-white">all skin types</strong>.
                </p>
              </article>

              {/* Feature numbers */}
              <div className="grid grid-cols-3 gap-3 reveal reveal-delay-3">
                {[
                  ["12h+", "Longevity"],
                  ["50+", "Notes"],
                  ["0", "Parabens"],
                ].map(([n, l]) => (
                  <div
                    key={l}
                    className="bg-[#faf8f6] rounded-2xl p-4 text-center"
                  >
                    <p className="font-display text-3xl text-pink-600 font-light">
                      {n}
                    </p>
                    <p className="font-body text-[0.65rem] tracking-widest uppercase text-gray-400 mt-1">
                      {l}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BANNER CTA ─────────────────────────────────────────────── */}
      <section className="px-6 lg:px-20 pb-20">
        <div className="relative rounded-2xl overflow-hidden reveal">
          <img
            className="w-full h-[45vh] object-cover"
            src={productImages.perfume2}
            alt="Luxury Scent Collection"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
            <p className="font-body text-[0.65rem] tracking-[0.35em] uppercase text-pink-300 mb-4">
              Limited Edition
            </p>
            <h2 className="font-display text-4xl lg:text-6xl font-light mb-6">
              Luxury Scent Collection
            </h2>
            <Link
              to="/products"
              className="btn-primary bg-white text-gray-900 px-10 py-4 hover:bg-pink-50 transition-colors duration-300"
            >
              Explore All
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
