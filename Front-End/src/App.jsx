import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ClientLayout from "./pages/layouts/ClientLayout";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<ClientLayout />}>
					<Route index element={<Home />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
