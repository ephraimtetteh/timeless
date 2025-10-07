import { RiArrowDropDownLine } from "react-icons/ri";

const ProductPage = () => {
  return (
    <div className="mt-[4rem] px-20">
      <h1 className="text-4xl  text-center mb-4">Men's</h1>
      <div className="flex justify-between p-3 ">
        {/* right div */}
        <div className="text-gray-500"> Product/Men's</div>

        {/* left div */}
        <div className="flex gap-4 items-center ">
          <p className="border-r  border-gray-500 border-solid px-4  text-gray-500 ">
            Filters
          </p>
          <article className="flex gap-2">
            <p className="text-gray-500">Sort by latest </p>

            {/* dropdown icon */}
            <div >
            <button className="text-2xl text-gray-500">
              <RiArrowDropDownLine className="text-gray-500 hover:text-pink-300 hover:bg-pink-500  hover:rounded-2xl  transition duration-300 ease-in-out " />
            </button>


            </div>
          </article>
        </div>
      </div>

      {/* products  Display Section*/}
      <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* container div  */}
        <div className="">
          <img
            className="w-64 h-70 object-center object-cover pt-4"
            src="/Perfume6.jpg"
            alt="image"
          />

          {/* product details */}
          <div className="text-center">
            <p>
              Perfume Name - Size <br /> $800
            </p>
          </div>
        </div>
        <div className="">
          <img
            className="w-64 h-70 object-center object-cover pt-4"
            src="/Perfume6.jpg"
            alt="image"
          />

          {/* product details */}
          <div className="text-center">
            <p>
              Perfume Name - Size <br /> $800
            </p>
          </div>
        </div>
        <div className="">
          <img
            className="w-64 h-70 object-center object-cover pt-4"
            src="/Perfume6.jpg"
            alt="image"
          />

          {/* product details */}
          <div className="text-center">
            <p>
              Perfume Name - Size <br /> $800
            </p>
          </div>
        </div>
        <div className="">
          <img
            className="w-64 h-70 object-center object-cover pt-4"
            src="/Perfume6.jpg"
            alt="image"
          />

          {/* product details */}
          <div className="text-center">
            <p>
              Perfume Name - Size <br /> $800
            </p>
          </div>
        </div>
        <div className="">
          <img
            className="w-64 h-70 object-center object-cover pt-4"
            src="/Perfume6.jpg"
            alt="image"
          />

          {/* product details */}
          <div className="text-center">
            <p>
              Perfume Name - Size <br /> $800
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
