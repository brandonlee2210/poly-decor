import "./App.scss";
import { Provider } from "react-redux";
import store from "./store/store";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Cart } from "./pages/index";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<h1>Home page</h1>} />
            <Route path="/category/:id" element={<h1>Category page</h1>} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
