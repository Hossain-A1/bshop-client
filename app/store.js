import { configureStore } from "@reduxjs/toolkit";
import productReducer, {
  fetchAllProducts,
} from "../features/product/productSlice";
import cartReducer from '../features/cart/cartSlice'
import authReducer from "@/features/auth/authSlice";
const store = configureStore({
  reducer: {
    product: productReducer,
    cart:cartReducer,
    auth:authReducer
  },
});

// Dispatch fetchAllProducts for the first load
store.dispatch(fetchAllProducts({ endpoint: "/list", load: 1, limit: 10 }));
export default store;
