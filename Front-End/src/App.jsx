import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import ClientLayout from "./pages/layouts/ClientLayout";
import NotFound from "./pages/404";
import Category from "./pages/Category";
import Checkout from "./pages/Checkout";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<ClientLayout />}>
					<Route index element={<Home />} />
					<Route path="cart" element={<Cart />} />
					<Route path="category/:id" element={<Category />} />
					<Route path="checkout" element={<Checkout />} />
				</Route>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
