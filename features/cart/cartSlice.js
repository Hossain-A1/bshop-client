import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
};

export const counterSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.cartItems.find((cartItem) => cartItem._id === action.payload._id);

      if (item) {
        // If item exists, increase its quantity
        item.quantity += 1;
      } else {
        // If item does not exist, add it with quantity 1
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart } = counterSlice.actions;

export default counterSlice.reducer;
