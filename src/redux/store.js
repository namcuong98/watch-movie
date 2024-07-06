import { configureStore } from "@reduxjs/toolkit";
import navigationReducer from "./navigationSlice";
import watchMovieReducer from "./watchMovieSlice";
import findFilmReducer from "./findFilmSlice";
import flagSliceReduce from "./flagSlice";
import categoryReduce from "./categorySlice";

export const store = configureStore({
  reducer: {
    navigation: navigationReducer,
    watchMovie: watchMovieReducer,
    findFilm: findFilmReducer,
    flag: flagSliceReduce,
    category: categoryReduce,
  },
});
