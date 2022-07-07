import { createSlice } from "@reduxjs/toolkit";

const CodSlice = createSlice({
  name: "COD",
  initialState: { codApply: false },
  reducers: {
    codApplied: (state, action) => {
      state.codApply = action.payload;
    },
  },
});

export const { codApplied } = CodSlice.actions;
export default CodSlice.reducer;
