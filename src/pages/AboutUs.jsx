import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="w-full flex  min-h-screen bg-gray-200 ">
      {/* Card div */}
      <div className="flex flex-col md:flex-row gap-8 bg-white  py-8 shadow-2xl rounded-xl max-w-5xl w-full m-auto">
        {/* Image */}
        <div className="flex justify-center items-center w-full md:w-1/2">
          <img
            className="w-64 h-100 object-cover rounded-lg"
            src="/Perfume7.jpg"
            alt="Timeless Beauty Perfume"
          />
        </div>
        <div className="flex flex-col justify-center items-center w-full md:w-1/2">
          <h1 className="text-3xl font-bold text-center mb-4">About Us</h1>
          <div className="w-full">
            <div className="flex flex-col md:flex-row text-sm justify-around items-center mb-4">
              <h3 className="text-base font-semibold text-center md:text-left mb-2 md:mb-0">
                You can find us on
              </h3>
              <div className="flex gap-2 md:gap-2 text-lg">
                <a
                  href="https://facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <FaFacebookF className="hover:text-pink-700 transition-colors" />
                </a>
                <a
                  href="https://instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <FaInstagram className="hover:text-pink-700 transition-colors" />
                </a>
                <a
                  href="https://twitter.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                >
                  <FaTwitter className="hover:text-pink-700 transition-colors " />
                </a>
                <a
                  href="https://Whatsapp.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WHatsapp"
                >
                  <FaWhatsapp className="hover:text-pink-700 transition-colors text-xl font-bold" />
                </a>
              </div>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed pr-6   ">
              Timeless Beauty and Cosmetics is dedicated to providing
              high-quality perfumes, skincare, and hair products designed to
              enhance your natural beauty and boost your confidence. Our
              carefully curated collection combines elegance, luxury, and
              innovation to help you express your unique style every day.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
