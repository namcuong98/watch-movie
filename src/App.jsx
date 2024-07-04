import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./page/home";
import Favourites from "./page/favourites";
import { MenuData } from "./components/HardData";
import Films from "./page/films/Films";
import FilmDetail from "./components/FilmDetail";
import WatchMovie from "./components/WatchMovie";
import FindFilm from "./page/FindFilm";

function App() {
  const routerFilms = MenuData.slice(1, -1);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            {routerFilms.map((router) => {
              return (
                <>
                  <Route
                    path={`${router.path}`}
                    element={<Films data={router} />}
                  ></Route>
                  <Route
                    path={`${router.path}/:filmSlug`}
                    element={<FilmDetail />}
                  />
                  <Route
                    path={`${router.path}/:filmSlug/xem-phim`}
                    element={<WatchMovie />}
                  />
                </>
              );
            })}
            <Route path="tim-kiem" element={<FindFilm />} />
            <Route path="favourites" element={<Favourites />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
