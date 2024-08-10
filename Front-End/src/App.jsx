import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import ClientLayout from "./pages/layouts/ClientLayout";
import NotFound from "./pages/404";
import Category from "./pages/Category";
import Checkout from "./pages/Checkout";
import { CartProvider } from "./CartContext";
import ProductDetail from "./pages/ProductDetail";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ClientLayout />}>
            <Route index element={<Home />} />
            <Route path="category/:name" element={<Category />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
