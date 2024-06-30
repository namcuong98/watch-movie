import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selected: "Trang Chủ",
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    selectPage: (state, action) => {
      state.selected = action.payload;
    },
  },
});

export const { selectPage } = navigationSlice.actions;
export default navigationSlice.reducer;
