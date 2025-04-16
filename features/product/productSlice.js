import { getSingleProduct } from "@/libs";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const serverURL = process.env.NEXT_PUBLIC_BACKEND_URL;
// Fetch all products
export const fetchAllProducts = createAsyncThunk(
  "product/fetchAll",
  async (
    { endpoint = "/list", search = "", load = 1, limit = 10 },
    { rejectWithValue }
  ) => {
    try {
      const params = {
        load,
        limit,
      };

      if (search) {
        params.search = search;
      }

      const res = await axios.get(`${serverURL}/api/product${endpoint}`, {
        params,
      });

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

export const add_product = createAsyncThunk(
  "product/add_product",
  async (product, { rejectWithValue, fulfillWithValue, getState }) => {
    // const token = getState().auth.token;
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //     "Content-Type": "multipart/form-data", // Required for file uploads
    //   },
    // };

    try {
      const formData = new FormData();
      formData.append("title", product.title);
      formData.append("desc", product.desc);
      formData.append("sold", product.sold);
      formData.append("stock", product.stock);
      formData.append("discount", product.discount);
      formData.append("category", product.category);
      formData.append("brand", product.brand || "");
      formData.append("price", product.price);
      formData.append("sizes", JSON.stringify(product.sizes));
      formData.append("color", JSON.stringify(product.color));

      // Append images and colorImages
      product.images.forEach((image) => formData.append("images", image));
      product.colorImages.forEach((image) =>
        formData.append("colorImages", image)
      );

      // Send request to the server
      const { data } = await axios.post(
        `${serverURL}/api/product/create`,
        formData
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { error: "An unknown error occurred" }
      );
    }
  }
);

// Initial State
const initialState = {
  products: [],
  searchResults: [],
  product: {},
  searchQuery: "",
  loading: false,
  error: null,
  successMessage: "",
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
    seeMoreProducts: (state) => {
      if (state.pagination.currentLoad < state.pagination.totalLoad) {
        state.pagination.currentLoad += 1;
      }
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload.trim();
    },

    resetSearchResults: (state) => {
      state.searchResults = [];
    },

    messageClear: (state) => {
      state.error = "";
      state.successMessage = "";
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
        // Merge products without duplicates
        const existingIds = new Set(state.products.map((p) => p._id));
        const newProducts = action.payload.products.filter(
          (product) => !existingIds.has(product._id)
        );

        if (state.searchQuery) {
          // Store searched products separately
          state.searchResults = action.payload.products;
        } else {
          // Keep original products array
          state.products = [...state.products, ...newProducts];
        }
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
      })
      //add single product
      .addCase(add_product.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.successMessage = "";
      })
      .addCase(add_product.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.successMessage = payload.message;
        state.product = payload.product; 
      })
      .addCase(add_product.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload.message || "Failed to add product";
      });
  },
});

// Export Actions & Reducer
export const { seeMoreProducts, setSearchQuery, resetSearchResults } =
  productSlice.actions;
export default productSlice.reducer;
