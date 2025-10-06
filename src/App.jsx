import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProductsCard from "./pages/ProductsCard";
import AdminDashboard from "./pages/AdminDashboard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ForgotPassword from "./pages/ForgotPassword";
import SignleProductPage from "./pages/SignleProductPage";
import Checkout from "./pages/Checkout";
import ProductPage from "./pages/ProductPage";
import AllProduct from "./pages/AllProduct";

function App() {
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
        <Route path="AdminDashboard" element={<AdminDashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/signle-product" element={<> <Header /><SignleProductPage /><Footer /> </>} />
        <Route path="/checkout" element={<> <Header /><Checkout /><Footer /> </>} />
        <Route path="/products" element={<> <Header /><ProductPage /><Footer /> </>} />
        <Route path="/all-products" element={<> <Header /><AllProduct /><Footer /> </>}   />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
