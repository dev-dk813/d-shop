import { createSlice } from "@reduxjs/toolkit";

const couponSlice = createSlice({
  name: "coupon",
  initialState: { couponApp: false },
  reducers: {
    couponApplied: (state, action) => {
      state.couponApp = action.payload;
    },
  },
});

export const { couponApplied } = couponSlice.actions;
export default couponSlice.reducer;
