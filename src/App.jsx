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

import AdminLayout from "./pages/admin/AdminLayout";
import AdminOverview from "./pages/admin/AdminOverview";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminCustomers from "./pages/admin/AdminCustomers";

const StoreLayout = ({ children }) => (
  <>
    <Header />
    <main>{children}</main>
    <Footer />
  </>
);




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
        <main>
          <Routes>
            {/* Public */}
            <Route
              path="/"
              element={
                <StoreLayout>
                  <Home />
                </StoreLayout>
              }
            />
            <Route
              path="/products"
              element={
                <StoreLayout>
                  <ProductPage />
                </StoreLayout>
              }
            />
            <Route
              path="/product/:id"
              element={
                <StoreLayout>
                  <SingleProductPage />
                </StoreLayout>
              }
            />
            <Route
              path="/about-us"
              element={
                <StoreLayout>
                  <AboutUs />
                </StoreLayout>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Protected — logged in */}
            <Route element={<ProtectedRoute />}>
              <Route
                path="/checkout"
                element={
                  <StoreLayout>
                    <Checkout />
                  </StoreLayout>
                }
              />
              <Route
                path="/place-order"
                element={
                  <StoreLayout>
                    <PlaceOrder />
                  </StoreLayout>
                }
              />
              <Route
                path="/order-success"
                element={
                  <StoreLayout>
                    <OrderSuccess />
                  </StoreLayout>
                }
              />
            </Route>


            {/* Admin only */}
            <Route element={<ProtectedRoute adminOnly={true} />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminOverview />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="customers" element={<AdminCustomers />} />
              </Route>
            </Route>
          </Routes>
        </main>
      </BrowserRouter>
    );
  }
   

export default App;
