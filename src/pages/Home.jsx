import Products from "../components/Products";

const Home = () => {
  return (
    <div>
      {/* Hero  Section */}
      <section className="grid lg:grid-cols-2 justify-between items-center px-5 py-2 text-gray-900 cursor-pointer  ">
          {/* Text  div */}
          <div className="lg:px-20 pt-20">
            <h1 className="lg:text-7xl text-4xl text-pink-700 tracking-tight ">Discover the Essence of Luxury</h1>
            <button className="bg-pink-700 text-white px-4 py-2  mt-5">Shop Now</button>
          </div>

          {/* image  div */}

          <div>
            <img
              className="w-full lg:h-screen object-center object-cover pt-4"
              src="/Perfume1.jpg"
              alt="image"
            />
          </div>
      </section>

      {/* Products */}
      <section className=" ">
        {/* Left side */}

        {/* <div className="flex justify-between items-center px-5 py-2 text-gray-900 cursor-pointer  ">
          <div className=" font-bold tracking-tighter">
            <h2 className="text-lg hover:text-pink-700 hover:border-b-2">
              OUR TOP PRODUCTS
            </h2>
          </div>

          <div className="flex gap-4 font-bold tracking-tight">
            <p className="hover:text-pink-700 border-b-2  ">ALL PERFUMES</p>
            <p className="hover:text-pink-700 hover:border-b-2 ">WOMEN</p>
            <p className="hover:text-pink-700 hover:border-b-2 ">MEN </p>
            <p className="hover:text-pink-700 hover:border-b-2 ">UNISEX </p>
          </div>
        </div> */}

        <div>
          <Products />
        </div>
      </section>
    </div>
  );
};

export default Home;
