import { createSlice } from "@reduxjs/toolkit";

let userCart = [];
if (typeof window !== "undefined") {
  // If cart is in localStorage GET it
  if (localStorage.getItem("cart")) {
    userCart = JSON.parse(localStorage.getItem("cart"));
  } else {
    userCart = [];
  }
}

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    userCart,
  },
  reducers: {
    AddToCart: (state, action) => {
      state.userCart = action.payload;
    },
  },
});

export const { AddToCart } = cartSlice.actions;
export default cartSlice.reducer;
