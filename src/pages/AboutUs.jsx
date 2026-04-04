// AboutUs.jsx — editorial split-screen luxury brand layout
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";

const values = [
  {
    number: "01",
    title: "Crafted with Intention",
    desc: "Every bottle begins with a vision — an emotion, a memory, a feeling we want to evoke. Our perfumers spend months refining each formula.",
  },
  {
    number: "02",
    title: "Naturally Sourced",
    desc: "We partner with ethical suppliers across the globe to source the rarest botanicals, resins, and florals at their peak potency.",
  },
  {
    number: "03",
    title: "Skin-Kind Promise",
    desc: "Dermatologically tested and free from harmful chemicals. Safe for all skin types, every single time.",
  },
];

const socials = [
  { icon: FaFacebookF, href: "https://facebook.com/", label: "Facebook" },
  { icon: FaInstagram, href: "https://instagram.com/", label: "Instagram" },
  { icon: FaTwitter, href: "https://twitter.com/", label: "Twitter" },
  { icon: FaWhatsapp, href: "https://wa.me/", label: "WhatsApp" },
];

const AboutUs = () => {
  return (
    <div className="bg-[#faf8f6] min-h-screen font-['Jost',sans-serif] pt-24">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500&display=swap');`}</style>

      {/* ── HERO SPLIT ──────────────────────────────────── */}
      <section className="grid lg:grid-cols-2 min-h-[80vh]">
        {/* Image */}
        <div className="relative overflow-hidden bg-gray-900 lg:h-auto h-[50vh]">
          <img
            src="/Perfume7.jpg"
            alt="Timeless Beauty Perfume"
            className="w-full h-full object-cover opacity-85"
            style={{ objectPosition: "center 20%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
          {/* Floating label */}
          <div className="absolute bottom-10 left-10 border-l-2 border-pink-400 pl-4">
            <p className="font-['Cormorant_Garamond',serif] text-white text-2xl italic font-light">
              Since 2018
            </p>
            <p className="text-pink-200 text-[0.65rem] tracking-widest uppercase mt-1">
              Accra, Ghana
            </p>
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col justify-center px-10 lg:px-20 py-16 bg-white">
          <p className="text-[0.65rem] tracking-[0.3em] uppercase text-pink-500 mb-4">
            Our Story
          </p>
          <h1 className="font-['Cormorant_Garamond',serif] text-5xl lg:text-6xl text-gray-900 leading-tight font-light mb-6">
            Beauty Rooted
            <br />
            <em className="text-pink-700">in Elegance</em>
          </h1>
          <p className="text-gray-600 text-[0.9rem] leading-relaxed max-w-md mb-8">
            Timeless Beauty and Cosmetics is dedicated to providing high-quality
            perfumes, skincare, and hair products designed to enhance your
            natural beauty and boost your confidence. Our carefully curated
            collection combines elegance, luxury, and innovation to help you
            express your unique style every day.
          </p>

          {/* Social links */}
          <div>
            <p className="text-[0.65rem] tracking-[0.25em] uppercase text-gray-400 mb-4">
              Find us on
            </p>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:border-pink-500 hover:text-pink-600 transition-all duration-300"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BRAND VALUES ────────────────────────────────── */}
      <section className="px-6 lg:px-20 py-20 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[0.65rem] tracking-[0.3em] uppercase text-pink-500 mb-3">
            What We Stand For
          </p>
          <h2 className="font-['Cormorant_Garamond',serif] text-4xl lg:text-5xl text-gray-900 font-light">
            Our Principles
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map(({ number, title, desc }) => (
            <div key={number} className="flex flex-col gap-4 group">
              <p className="font-['Cormorant_Garamond',serif] text-5xl text-pink-200 font-light group-hover:text-pink-400 transition-colors duration-300">
                {number}
              </p>
              <div className="w-10 h-px bg-pink-400" />
              <h3 className="font-['Cormorant_Garamond',serif] text-2xl text-gray-800 font-medium">
                {title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── QUOTE BANNER ────────────────────────────────── */}
      <section className="bg-pink-700 py-16 px-6 text-center">
        <p className="font-['Cormorant_Garamond',serif] text-3xl lg:text-4xl text-white italic font-light max-w-3xl mx-auto leading-relaxed">
          "A fragrance is the invisible part of a person's personality — make
          yours unforgettable."
        </p>
        <p className="mt-6 text-pink-200 text-[0.7rem] tracking-[0.25em] uppercase">
          — Timeless Beauty & Cosmetics
        </p>
      </section>

      {/* ── TEAM / CONTACT TEASER ────────────────────────── */}
      <section className="px-6 lg:px-20 py-20 max-w-6xl mx-auto text-center">
        <p className="text-[0.65rem] tracking-[0.3em] uppercase text-pink-500 mb-4">
          Get in Touch
        </p>
        <h2 className="font-['Cormorant_Garamond',serif] text-4xl text-gray-900 mb-4 font-light">
          We'd Love to Hear From You
        </h2>
        <p className="text-gray-500 text-sm max-w-md mx-auto mb-8">
          Whether you're looking for a bespoke scent recommendation or want to
          partner with us — our team is always happy to help.
        </p>
        <a
          href="mailto:hello@timelessbeauty.com"
          className="inline-block text-[0.7rem] tracking-widest uppercase border border-pink-700 text-pink-700 px-10 py-4 hover:bg-pink-700 hover:text-white transition-all duration-300 rounded-full"
        >
          Contact Us
        </a>
      </section>
    </div>
  );
};

export default AboutUs;
