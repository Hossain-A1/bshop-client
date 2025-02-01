import { configureStore } from "@reduxjs/toolkit";
import productReducer, {
  fetchAllProducts,
} from "../features/product/productSlice";

const store = configureStore({
  reducer: {
    product: productReducer,
  },
});

// Dispatch fetchAllProducts for the first load
store.dispatch(fetchAllProducts({ endpoint: "/list", load: 1, limit: 1 }))
export default store;
