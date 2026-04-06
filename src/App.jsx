import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
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
import { fetchMe } from "./lib/features/auth/authSlice";
import SingleProductPage from "./pages/SignleProductPage";
import ResetPassword from "./pages/ResetPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import { OrderSuccess } from "./pages/OrderSuccess";

// import AllProduct from "./pages/AllProduct";




function App() {

  const { cartItems } = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(calculateTotal())
  }, [cartItems]);
   
    // On mount: try to restore session from cookie / token
    useEffect(() => {
      dispatch(fetchMe())
    }, [dispatch])
   
    return (
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            {/* Public */}
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/product/:id" element={<SingleProductPage />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
   
            {/* Protected — must be logged in */}
            <Route element={<ProtectedRoute />}>
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/place-order" element={<PlaceOrder />} />
              <Route path="/order-success" element={<OrderSuccess />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    )
  }
   

export default App;
