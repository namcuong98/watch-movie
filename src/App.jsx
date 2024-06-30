import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./page/home";
import Movies from "./page/movies";
import Series from "./page/series";
import Favourites from "./page/favourites";
import NewMovies from "./page/newMovies";
import NowShowing from "./page/nowShowing";
import TVShows from "./page/TVShows";
import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="new-movies" element={<NewMovies />} />
              <Route path="now-showing" element={<NowShowing />} />
              <Route path="movies" element={<Movies />} />
              <Route path="series" element={<Series />} />
              <Route path="tv-shows" element={<TVShows />} />
              <Route path="favourites" element={<Favourites />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
