import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selected: 0,
};

const flagSlice = createSlice({
  name: "flag",
  initialState,
  reducers: {
    changeFlag: (state) => {
      state.selected += 1;
    },
  },
});

export const { changeFlag } = flagSlice.actions;
export default flagSlice.reducer;
