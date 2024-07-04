import { configureStore } from "@reduxjs/toolkit";
import navigationReducer from "./navigationSlice";
import watchMovieReducer from "./watchMovieSlice";
import findFilmReducer from "./findFilmSlice";

export const store = configureStore({
  reducer: {
    navigation: navigationReducer,
    watchMovie: watchMovieReducer,
    findFilm: findFilmReducer,
  },
});
