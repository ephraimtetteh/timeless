import { FiShoppingCart } from "react-icons/fi";
import { VscAccount } from "react-icons/vsc";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className=" flex  items-center px-4 py-2 w-full h-12 justify-between bg-pink-500/50 cursor-pointer  text-gray-900 ">
      {/* Left side */}
      <div className="flex items-center ">
        <Link
          className="font-bold text-xl hover:text-pink-600 tracking-tighter"
          to={"/"}
        >
     TIMELESS
        </Link>
      </div>

      {/* Left side */}
      <div className="flex items-center gap-4 font-bold ">
        <p className="hover:text-pink-700">Bestsellers</p>
        <p className="hover:text-pink-700">New Scents</p>
        <p className="hover:text-pink-700">Featured</p>
        <p className="hover:text-pink-700">About Us</p>
      </div>

      {/* Right side */}
      <div className="flex gap-2 items-center ">
        <Link to={"/signup"}>
          <span className=" hover:text-pink-600">
            <VscAccount className="text-xl text-pink-700" />
          </span>
        </Link>

        <span className=" hover:text-pink-600">
          <FiShoppingCart  className="text-xl font-extrabold" />
        </span>
      </div>
    </div>
  );
};

export default Header;
