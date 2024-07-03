import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selected: "",
};

const watchMovieSlice = createSlice({
  name: "watchMovie",
  initialState,
  reducers: {
    selectWatchMovie: (state, action) => {
      state.selected = action.payload;
    },
  },
});

export const { selectWatchMovie } = watchMovieSlice.actions;
export default watchMovieSlice.reducer;
