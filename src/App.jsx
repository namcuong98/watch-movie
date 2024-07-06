import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./page/home";
import Favourites from "./page/favourites";
import { ListCategory, MenuData } from "./components/HardData";
import Films from "./page/films/Films";
import FilmDetail from "./components/FilmDetail";
import WatchMovie from "./components/WatchMovie";
import FindFilm from "./page/FindFilm";
import { ScrollToTop } from "./utils/Other";
import Category from "./page/category";
import RpsCategory from "./page/category/RpsCategory";

function App() {
  const routerFilms = MenuData.slice(1, -1);

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            {routerFilms.map((router) => {
              return (
                <>
                  <Route
                    key={router.id}
                    path={`${router.path}`}
                    element={<Films data={router} />}
                  ></Route>
                  <Route
                    key={router.id}
                    path={`${router.path}/:filmSlug`}
                    element={<FilmDetail />}
                  />
                  <Route
                    key={router.id}
                    path={`${router.path}/:filmSlug/xem-phim`}
                    element={<WatchMovie />}
                  />
                </>
              );
            })}
            <Route path="tim-kiem" element={<FindFilm />} />
            {ListCategory.map((category) => {
              return (
                <>
                  <Route
                    key={category.key}
                    path={`the-loai/${category.item}`}
                    element={<Category />}
                  />
                  <Route
                    key={category.key}
                    path={`the-loai/${category.item}/:filmSlug`}
                    element={<FilmDetail />}
                  />
                  <Route
                    key={category.key}
                    path={`the-loai/${category.item}/:filmSlug/xem-phim`}
                    element={<WatchMovie />}
                  />
                </>
              );
            })}
            <Route path="favourites" element={<Favourites />} />
            <Route path="favourites/:filmSlug" element={<WatchMovie />} />
            <Route path="rps-category" element={<RpsCategory />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
