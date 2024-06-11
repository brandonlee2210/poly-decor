import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modalSlice";
import cartReducer from "./cartSlice";
import categoryReducer from "./categorySlice";
const store = configureStore({
  reducer: {
    category: categoryReducer,
    modal: modalReducer,
    cart: cartReducer,
  },
});

export default store;
