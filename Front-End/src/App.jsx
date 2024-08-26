import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ClientLayout from "./pages/layouts/ClientLayout";
import ProductDetail from "./pages/ProductDetail";
import Category from "./pages/Category";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import UpdateInfo from "./pages/UpdateInfo";
import History from "./pages/History";
import HistoryDetail from "./pages/HistoryDetail";
import ResultCheckout from "./pages/ResultCheckout";
import SearchResult from "./pages/SearchResult.jsx";
import SearchResult from "./pages/SearchResult.jsx";
import { CartProvider } from "./CartContext.jsx";
import { LoginProvider } from "./LoginContext.jsx";
import InfoUserForm from "./components/common/InfoUserForm.jsx";
import ReviewPage from "./pages/Review.jsx";
import ForgotPw from "./pages/ForgotPw.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";

function App() {
  return (
    <LoginProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ClientLayout />}>
              <Route index element={<Home />} />
              <Route path="product/:id" element={<ProductDetail />} />
              <Route path="category/:name" element={<Category />} />
              <Route path="search/:keyword" element={<SearchResult />} />
              <Route path="cart" element={<Cart />} />
              <Route path="forgot" element={<ForgotPw />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              
              <Route path="checkout" element={<Checkout />} />
              <Route path="wishlist" element={<Wishlist />} />
              <Route path="result-checkout/:src" element={<ResultCheckout />} />
              <Route path="result-checkout" element={<ResultCheckout />} />
              <Route path="update-info" element={<InfoUserForm />} />
              <Route path="history" element={<History />} />
              <Route path="history/:id" element={<HistoryDetail />} />
              <Route path="reviews/:id" element={<ReviewPage />} />
            </Route>
            
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </LoginProvider>
  );
}

export default App;
