import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProductsCard from "./pages/ProductsCard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ForgotPassword from "./pages/ForgotPassword";
import SignleProductPage from "./pages/SignleProductPage";
import Checkout from "./pages/Checkout";
import ProductPage from "./pages/ProductPage";
import AboutUs from "./pages/AboutUs";
import PlaceOrder from "./pages/PlaceOrder";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { calculateTotal } from "./lib/features/cart/cartSlice";
// import AllProduct from "./pages/AllProduct";




function App() {

  const { cartItems } = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(calculateTotal())
  }, [cartItems]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header /> <Home /> <Footer />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Productscard" element={<ProductsCard />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route
          path="/about-us"
          element={
            <>
              <Header />
              <AboutUs />
              <Footer />
            </>
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/signle-product"
          element={
            <>
              <Header />
              <SignleProductPage />
              <Footer />
            </>
          }
        />
        <Route
          path="/checkout"
          element={
            <>
              <Header />
              <Checkout />
              <Footer />
            </>
          }
        />
        <Route
          path="/products"
          element={
            <>
              <Header />
              <ProductPage />
              <Footer />
            </>
          }
        />
        {/* <Route path="/all-products" element={<> <Header /><AllProduct /><Footer /> </>}   /> */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
