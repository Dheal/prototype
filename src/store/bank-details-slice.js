import { createSlice } from "@reduxjs/toolkit";

export const bankDetailsSlice = createSlice({
  name: "bankDetails",
  initialState: {
    data: 0
  },
  reducers: {
    getBankDetails(state, action) {
      state.data = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { getBankDetails } = bankDetailsSlice.actions;

export default bankDetailsSlice;