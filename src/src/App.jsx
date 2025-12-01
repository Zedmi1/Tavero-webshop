import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartSlider from "./components/CartSlider";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Verify2FA from "./pages/Verify2FA";
import FAQ from "./pages/FAQ";
import Shipping from "./pages/Shipping";
import Returns from "./pages/Returns";
import SizeGuide from "./pages/SizeGuide";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import "./App.css";

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="app">
      {isHomePage && (
        <div className="announcement-bar">
          <div className="announcement-track">
            <span>Free shipping on all orders over €50 📦</span>
            <span>Free shipping on all orders over €50 📦</span>
            <span>Free shipping on all orders over €50 📦</span>
            <span>Free shipping on all orders over €50 📦</span>
            <span>Free shipping on all orders over €50 📦</span>
            <span>Free shipping on all orders over €50 📦</span>
            <span>Free shipping on all orders over €50 📦</span>
            <span>Free shipping on all orders over €50 📦</span>
            <span>Free shipping on all orders over €50 📦</span>
            <span>Free shipping on all orders over €50 📦</span>
            <span>Free shipping on all orders over €50 📦</span>
            <span>Free shipping on all orders over €50 📦</span>
            <span>Free shipping on all orders over €50 📦</span>
            <span>Free shipping on all orders over €50 📦</span>
            <span>Free shipping on all orders over €50 📦</span>
            <span>Free shipping on all orders over €50 📦</span>
            <span>Free shipping on all orders over €50 📦</span>
            <span>Free shipping on all orders over €50 📦</span>
            <span>Free shipping on all orders over €50 📦</span>
            <span>Free shipping on all orders over €50 📦</span>
            <span>Free shipping on all orders over €50 📦</span>
            <span>Free shipping on all orders over €50 📦</span>
            <span>Free shipping on all orders over €50 📦</span>
            <span>Free shipping on all orders over €50 📦</span>
            <span>Free shipping on all orders over €50 📦</span>
            <span>Free shipping on all orders over €50 📦</span>
            <span>Free shipping on all orders over €50 📦</span>
            <span>Free shipping on all orders over €50 📦</span>
            <span>Free shipping on all orders over €50 📦</span>
            <span>Free shipping on all orders over €50 📦</span>
            <span>Free shipping on all orders over €50 📦</span>
            <span>Free shipping on all orders over €50 📦</span>
          </div>
        </div>
      )}
      <Navbar showAnnouncement={isHomePage} />
      <main className={`main-content ${isHomePage ? "with-announcement" : ""}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-2fa" element={<Verify2FA />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/returns" element={<Returns />} />
          <Route path="/size-guide" element={<SizeGuide />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </main>
      <Footer />
      <CartSlider />
    </div>
  );
}

export default App;
