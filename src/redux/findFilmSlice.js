import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  word: "",
};

const findFilmSlice = createSlice({
  name: "findFilm",
  initialState,
  reducers: {
    searchWord: (state, action) => {
      state.word = action.payload;
    },
  },
});

export const { searchWord } = findFilmSlice.actions;
export default findFilmSlice.reducer;
