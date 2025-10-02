import Products from "../components/Products";

const Home = () => {
  return (
    <div>
      {/* Hero  Section */}
      <section className="grid lg:grid-cols-2 justify-between items-center px-5 py-2 text-gray-900 cursor-pointer  ">
        {/* Text  div */}

        <div className="px-20">
          <h1 className="text-7xl text-pink-700 tracking-tight ">
            Discover the Essence of Luxury
          </h1>
          <button className="bg-pink-700 text-white px-4 py-2  mt-5">
            Shop Now
          </button>
        </div>

        {/* image  div */}

        <div>
          <img
            className="w-full h-screen object-cover pt-4"
            src="/Perfume1.jpg"
            alt="image"
          />
        </div>
      </section>

      {/* Products */}
      <section className=" ">
        {/* Left side */}

        <div>
          <Products />
        </div>
      </section>

      <section className="h-[100vh] bg-gray-200 ">
        <div>
          <h1 className="text-3xl text-pink-700 tracking-tight pt-5  ">
            Why Your Skin <br />
            Deserves the Best
          </h1>
        </div>
        <div>
          <article>
            {/* <img
              className="w-full h-screen object-cover"
              src="/Perfume2.jpg"
              alt="image"
            /> */}

            <div>
              <div>

              </div>
            </div>
          </article>


          <article></article>
        </div>

        {/* Card 1 div */}
        {/* <div className="bg-white rounded-xl hover:shadow-xl  duration-300  flex flex-col items-center text-center max-w-sm mx-auto  border-gray-100  ">
          <div className="   overflow-hidden rounded">
            <img
              className="rounded-lg h-[400px] w-[400px]  object-cover transition-transform duration-300 hover:scale-105"
              src="/Perfume3.jpg"
              alt="image"
            />
           </div>
        </div> */}
      </section>
    </div>
  );
};

export default Home;
