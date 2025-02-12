import { createSlice } from "@reduxjs/toolkit";

// Load cart from localStorage
const loadCartFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  }
  return [];
};

const initialState = {
  cartItems: loadCartFromLocalStorage(),
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.cartItems.find(
        (cartItem) =>
          cartItem._id === action.payload._id &&
          cartItem.selectedSize === action.payload.selectedSize &&
          cartItem.selectedColor.name === action.payload.selectedColor.name
      );

      if (item) {
        item.quantity += action.payload.quantity; // Increment by selected quantity
      } else {
        state.cartItems.push({ ...action.payload });
      }

      localStorage.setItem("cart", JSON.stringify(state.cartItems)); // ✅ Update localStorage
    },

    removeFromCart: (state, action) => {
      const { _id, selectedSize, selectedColor } = action.payload;

      state.cartItems = state.cartItems.filter(
        (item) =>
          !(
            item._id === _id &&
            item.selectedSize === selectedSize &&
            item.selectedColor.name === selectedColor.name
          )
      );

      localStorage.setItem("cart", JSON.stringify(state.cartItems)); //
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
