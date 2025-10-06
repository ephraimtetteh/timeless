import { FaRegCheckSquare } from "react-icons/fa";
import Products from "../components/Products";

const Home = () => {
  return (
    <div>

      {/* HERO  SECTION */}
      <section className="grid lg:grid-cols-2 justify-between items-center px-5 py-2 text-gray-900 cursor-pointer  ">
        {/* Text  div */}
        <div className="lg:px-20 pt-20">
          <h1 className="lg:text-7xl text-4xl text-pink-700 tracking-tight ">
            Indulge in the Art of Scent
          </h1>
          <p className="mt-3 sm:text-base">Where timeless elegance meets modern allure. Each fragrance is a masterpiece crafted to awaken your senses and leave a trail of unforgettable sophistication.</p>
          <button className="bg-pink-700 text-white px-4 py-2  mt-5 hover:bg-pink-800 ease-in-out duration-300">
            Shop Now
          </button>
        </div>

        {/* image  div */}

        <div>
          <img
            className="w-full lg:h-screen object-center object-cover pt-4"
            src="/Perfume6.jpg"
            alt="image"
          />
        </div>
      </section>

      {/* PRODUCTS  SECTION */}

      {/* Products Section */}
      <section>
        <Products />
      </section>

      {/* Third Section */}

      <section className="bg-pink-50 p-4 lg:p-12 xl:p-20">
        {/* Header Section */}
        <div>
          <h1 className="text-4xl sm:text-5xl text-pink-700  mb-6 text-center lg:text-left">
            Why Settle for Ordinary <br className="hidden sm:block" /> When You
            Can Smell Divine?
          </h1>
        </div>

        {/* Main Card Container */}
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl duration-300 grid lg:grid-cols-2 gap-4">
          {/* LEFT COLUMN: Image with Overlay Card */}
          <article className="relative">
            {/* Main Image Container */}
            <div className="overflow-hidden rounded-xl">
              <img
                className="w-full h-[70vh] sm:h-[60vh] lg:h-full object-cover object-center transition-transform duration-300"
                src="/Perfume3.jpg"
                alt="An image of perfume."
              />
            </div>

            {/* Overlay Container Card */}

            <div className="absolute bottom-4 left-4 max-sm:w-[90%]  p-4 sm:p-5 bg-white bg-opacity-90 backdrop-blur-sm text-gray-900 rounded-lg flex items-start justify-center gap-3 shadow-lg">
              {/* Icon Div */}
              <div className="text-xl text-pink-600 items-center justify-center">
                <FaRegCheckSquare className="justify-center" />
              </div>
              {/*  icon */}
              <div className="items-center justify-center">
                <h2 className="font-bold text-lg sm:text-xl text-pink-700">
                  The Signature Aura
                </h2>
                <p className="text-sm sm:text-base">
                  Infused with rare botanicals for a scent that lasts and a
                  feeling that lingers.
                </p>
              </div>
            </div>
          </article>

          {/* RIGHT COLUMN: Two Content Blocks (Top & Bottom) */}
          <article className="p-4 sm:p-6 flex flex-col">
            <div className="flex flex-col sm:flex-row items-center bg-gray-50 rounded-xl p-4 flex-grow mb-4">
              {/* Text Side */}
              <p className="text-base sm:text-lg p-3 text-center sm:text-left text-gray-700 sm:w-1/2 order-2 sm:order-1">
                <span className="font-bold text-xl sm:text-2xl text-pink-700 block mb-2">
                  Consciously Crafted Elegance
                </span>
                Crafted with care and conscience, our perfumes blend nature’s
                finest notes into pure, unforgettable luxury.{" "}
              </p>

              {/* Image Side */}
              <img
                className="w-full h-48 sm:h-auto sm:w-1/2 object-cover rounded-xl mt-4 sm:mt-0 order-1 sm:order-2"
                src="/Perfume3.jpg"
                alt="A stylized image of a dark glass dropper bottle labeled 'NM' with green leaves, suggesting natural ingredients."
              />
            </div>

            {/* BOTTOM Content Block - Full Width Banner */}
            <div className="bg-pink-500 rounded-xl p-6 h-auto">
              <h3 className="text-2xl font-bold text-white mb-2 text-center">
                100% Natural Essence
              </h3>
              <p className="text-sm sm:text-base text-pink-100 text-center">
                Pure ingredients, zero compromises. Dermatologically tested and
                perfect for <b className="text-white">All Skin Types</b>.
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* Fourth Section */}
      <section className="w-full rounded px-20">
        {/* Image Section */}
        <article className="relative w-full  shadow-lg hover:shadow-xl duration-300 mb-4">
          <img
            className="w-full h-96 sm:h-[60vh] lg:h-[90vh] object-cover object-center transition-transform duration-300"
            src="/Perfume2.jpg"
            alt="Perfume Banner"
          />

          Top-left card
          <div className="absolute top-6 left-4  flex items-center gap-4 rounded-xl p-3 bg-white/90 shadow-lg max-w-xs sm:max-w-sm ">
            <div className="w-10 h-10  flex items-center justify-center ">
              <img src="/Perfume6.jpg" alt="" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-semibold">
                Dawn Bloom{" "}
              </h1>
              <p className="text-sm sm:text-base">Fresh and vibrant notes.</p>
            </div>
          </div>

         
          <div className="absolute bottom-6 right-4 flex items-center gap-4 rounded-xl p-3 bg-white/90 shadow-lg max-w-xs sm:max-w-sm">
            <div className="w-10 h-10  flex items-center justify-center ">
              <img src="/Perfume6.jpg" alt="image" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-semibold">
                Velvet Night
              </h1>
              <p className="text-sm sm:text-base">Intense, mysterious aroma.</p>
            </div>
          </div>
        </article>
      </section> */}

      {/* Last Section */}

      <section className="w-full px-20 ">
        <div className="w-full   object-cover  relative  ">
          <img
            className="w-full h-96 sm:h-[60vh] lg:h-[50vh] object-cover transition-transform duration-300"
            src="/Perfume2.jpg"
            alt="image"
          />
          <div className="absolute inset-0 bg-black/55 "></div>
          <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-white text-center tracking-tight">
            Luxury Scent Collection
          </h1>
        </div>
      </section>
    </div>
  );
};

export default Home;
