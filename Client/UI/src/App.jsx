import "./App.scss";
import { Provider } from "react-redux";
import store from "./store/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<h1>Home page</h1>} />
            <Route path="/category/:id" element={<h1>Category page</h1>} />
            <Route path="/cart" element={<h1>Cart page</h1>} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
