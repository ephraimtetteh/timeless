import { FaFacebook, FaInstagram, FaTwitter, FaTiktok } from "react-icons/fa";
import { MdAddCall, MdLocationPin, MdOutlineMail } from "react-icons/md";

const Footer = () => {
  return (
    <div className="w-full bg-pink-500/50 cursor-pointer text-gray-800">

      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-13 px-5 py-10 sm:px-9 ">

        {/*  Brand & Social Media */}
        <div className="text-sm ">
          <img className="w-15  pb-4"
          src="/TM-logo.jpg" alt="logo" />
          {/* <p className="font-bold text-lg pb-3 ">TIMELESS</p> */} 
          <p className="text-sm pb-4 tracking-tight ">
              Discover <span className="font-bold">TIMELESS,</span> where every drop tells a story. Our curated scents capture the essence of a cherished memory, bottling the past, present, and future into an unforgettable experience. Indulge your senses.
 
 
          </p>
          <ul className="flex gap-4 text-xl pt-2">
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
        <div className="text-sm">
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
        <div className="text-sm">
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
              Shell 12 CH-8967
            </li>
          </ul>
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
