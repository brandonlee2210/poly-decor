import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import ClientLayout from "./pages/layouts/ClientLayout";
import NotFound from "./src/pages/404";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<ClientLayout />}>
					<Route index element={<Home />} />
					<Route path="cart" element={<Cart />} />
				</Route>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
