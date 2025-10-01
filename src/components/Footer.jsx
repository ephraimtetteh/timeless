import { FaFacebook, FaInstagram, FaTwitter, FaTiktok } from "react-icons/fa";
import { MdAddCall, MdLocationPin, MdOutlineMail } from "react-icons/md";

const Footer = () => {
  return (
    <div className="bg-pink-500/50 cursor-pointer text-gray-800">
      <div className="px-4 sm:px-10 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-14 py-6">
          {/* Brand & Social Media */}
          <div>
            <div className="text-sm">
              <img
                className="w-20 pb-4 "
                src="/TM-logo.jpg"
                alt="logo"
              />
              <p className="text-sm pb-4 tracking-tight">
                Discover <span className="font-bold">TIMELESS,</span> where
                every drop tells a story. Our curated scents capture the essence
                of a cherished memory, bottling the past, present, and future
                into an unforgettable experience. Indulge your senses.
              </p>
              <ul className="flex gap-4 text-xl pt-2 justify-center md:justify-start">
                <li>
                  <FaFacebook className="hover:text-pink-700 transition-colors" />
                </li>
                <li>
                  <FaInstagram className="hover:text-pink-700 transition-colors" />
                </li>
                <li>
                  <FaTwitter className="hover:text-pink-700 transition-colors" />
                </li>
                <li>
                  <FaTiktok className="hover:text-pink-700 transition-colors" />
                </li>
              </ul>
            </div>
          </div>

          {/* Navigation, Support, Contact */}
          <div className="md:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-20">
              {/* Navigation */}
              <div className="text-sm">
                <p className="font-bold text-lg pb-3">Navigation</p>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="hover:text-pink-700">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-pink-700">
                      News
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-pink-700">
                      Blogs
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-pink-700">
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>

              {/* Support */}
              <div className="text-sm mt-6 sm:mt-0">
                <p className="font-bold text-lg pb-3">Support</p>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="hover:text-pink-700">
                      Help
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-pink-700">
                      FAQ
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-pink-700">
                      Terms
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-pink-700">
                      Privacy
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contact */}
              <div className="text-sm mt-6 sm:mt-0">
                <p className="font-bold text-lg pb-3">Contact</p>
                <ul className="space-y-2">
                  <li className="flex gap-2 items-start">
                    <MdAddCall className="mt-1 flex-shrink-0" />
                    +1854 124 124
                  </li>
                  <li className="flex gap-2 items-start">
                    <MdOutlineMail className="mt-1 flex-shrink-0" />
                    timeless@gmail.com
                  </li>
                  <li className="flex gap-2 items-start">
                    <MdLocationPin className="mt-1 flex-shrink-0" />
                    123 Main Street
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright section */}
      <div className="border-t border-black pt-4 pb-4 text-center text-xs sm:text-sm text-gray-700 bg-pink-400/60">
        &copy; {new Date().getFullYear()} Timeless Perfume. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;