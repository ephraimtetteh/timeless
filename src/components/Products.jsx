
//  Product display 
const productData = [
  { img: "/Perfume1.jpg", title: "Brightening Perfume", text: "Revitalize your skin with our potent formula.", price: "$35.00" },
  { img: "/Perfume2.jpg", title: "Chanel Perfume", text: "Balance pH and prep skin for ultimate moisture.", price: "$28.00" },
  { img: "/Perfume3.jpg", title: "Prada Perfume", text: "Wake up to smoother, firmer-looking skin.", price: "$49.00" },
  { img: "/Perfume1.jpg", title: "Hydra Cream", text: "Deep hydration that lasts all day without grease.", price: "$32.00" },
 
];


const ProductCard = ({ img, title, text, price }) => {
  return (
    // Card container: white background, rounded corners, subtle shadow, centered text
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-5 flex flex-col items-center text-center max-w-sm mx-auto border border-gray-100">

      {/* Image container */}
      <div className="w-full mb-4 overflow-hidden rounded-lg">
        <img
          className="rounded-lg w-full h-56 object-cover transition-transform duration-300 hover:scale-105"
          src={img} 
          alt={title}
          // Fallback image in case the placehold.co link fails
          onError={(e) => { e.target.onerror = null; e.target.src=""; }}
        />
      </div>

      {/* Title */}
      <div className="flex-grow w-full">
        <h3 className="text-xl font-bold text-gray-800 tracking-tight mt-2 mb-1">
          {title}
        </h3>
      </div>

      {/* Description text */}
      <div className="text-sm tracking-tight text-gray-500 mb-3 flex-shrink">
        <p className="py-2">{text}</p>
      </div>

      {/* Price and "View Details" button */}
      <div className="w-full mt-auto">
        <h4 className="text-2xl font-extrabold text-gray-900 mb-4">{price}</h4>
        <button 
          className="w-full py-3 bg-pink-600 text-white rounded-full font-medium hover:bg-pink-700 transition duration-150 shadow-md shadow-green-400/50"
          onClick={() => console.log(`Viewing ${title}`)}
        >
            View Details
        </button>
      </div>
    </div>
  );
};



const App = () => {
  return (
    
    <div className="min-h-screen bg-gray-50 p-4 md:p-10">
      <div className="max-w-7xl mx-auto px-20">
        
        {/* Header/Title Section */}
          <div className="flex justify-between items-center px-5 py-2 text-gray-900 cursor-pointer  ">
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
        </div> 


        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-3">
          {productData.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>

        {/* Call to Action Button */}
        <div className="text-center mt-16 mb-24">
            <button className="px-10 py-3 bg-pink-600 text-white font-bold text-lg rounded-full shadow-2xl shadow-green-400/50 hover:bg-pink-700 transition duration-300 transform hover:scale-[1.03]">
                Shop All Our Perfumes
            </button>
        </div>

        {/* "Why Choose Us?" Section */}
        {/* <div className="text-center mt-20 py-10 px-6 bg-white rounded-2xl shadow-2xl">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-3">
                Why Choose us?
            </h2>
            <p className="text-xl text-gray-600">
                Experience the power of effective, natural skincare tailored for you.
            </p>
        </div> */}
      </div>
    </div>
  );
};

export default App;
