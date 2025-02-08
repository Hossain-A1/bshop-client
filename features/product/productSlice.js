import { getSingleProduct } from "@/libs";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const serverURL = "http://localhost:4000";

// Fetch all products
export const fetchAllProducts = createAsyncThunk(
  "product/fetchAll",
  async ({ endpoint = "/list", load = 1, limit = 1 }, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${serverURL}/api/product${endpoint}?load=${load}&limit=${limit}`
      );

      if (res.data.statusCode === 200) {
        return res.data.payload;
      } else {
        return rejectWithValue("Something went wrong");
      }
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);
// Fetch single product by slug
export const fetchSingleProduct = createAsyncThunk(
  "product/fetchSingleProduct",
  async (slug, { rejectWithValue }) => {
    try {
      return await getSingleProduct(slug);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial State
const initialState = {
  products: [],
  product: {},
  loading: false,
  error: null,
  pagination: {
    totalLoad: 1,
    currentLoad: 1,
    totalProducts: 0,
  },
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetProducts: (state) => {
      state.products = [];
      state.pagination.currentLoad = 1;
    },
    resetProductDetails: (state) => {
      state.product = null;
    },

    seeMoreProducts: (state) => {
      if (state.pagination.currentLoad < state.pagination.totalLoad) {
        state.pagination.currentLoad += 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = [...state.products, ...action.payload.products];
        state.pagination = {
          totalLoad: action.payload.totalLoad,
          currentLoad: action.payload.currentLoad,
          totalProducts: action.payload.totalNumberOfProducts,
        };
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      // single product----------
      .addCase(fetchSingleProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export Actions & Reducer
export const { resetProducts, resetProductDetails, seeMoreProducts } =
  productSlice.actions;
export default productSlice.reducer;
