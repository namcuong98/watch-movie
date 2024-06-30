import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://phim.nguonc.com/api/films/",
  method: "GET",
});

export const getData = (config) => {
  return axiosInstance(config);
};
