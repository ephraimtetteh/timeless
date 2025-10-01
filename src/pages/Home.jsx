import Products from "../components/Products";

const Home = () => {
  return (
    <div>
      {/* Hero */}
      <section>
        <img
          className="w-full h-screen object-cover"
          src="/Perfume2.jpg"
          alt="image"
        />
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
