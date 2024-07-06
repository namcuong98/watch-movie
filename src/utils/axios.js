import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://phim.nguonc.com/api/films/",
  method: "GET",
});

const filmAPI = axios.create({
  baseURL: "https://phim.nguonc.com/api/film/",
  method: "GET",
});

export const saveFilm = (info) => sessionStorage.setItem("infoFilm", info);
export const takeFilm = sessionStorage.getItem("infoFilm");

export const saveWordSearch = (word) =>
  sessionStorage.setItem("wordSearch", word);
export const takeWordSearch = sessionStorage.getItem("wordSearch");

export const saveCategory = (info) => sessionStorage.setItem("category", info);
export const takeCategory = sessionStorage.getItem("category");

export const getData = (url) => {
  return axiosInstance(url);
};

export const getDataFilmDetail = (url) => {
  return filmAPI(url);
};
