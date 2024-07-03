import { configureStore } from "@reduxjs/toolkit";
import navigationReducer from "./navigationSlice";
import watchMovieReducer from "./watchMovieSlice";

export const store = configureStore({
  reducer: {
    navigation: navigationReducer,
    watchMovie: watchMovieReducer,
  },
});
