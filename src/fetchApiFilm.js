import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYzQ2MWIxMTI1ZDM4MzM1ZTNkZTkxMGU5MGQwZWVjOCIsInN1YiI6IjY1Zjg1MmI0NTkwN2RlMDE3Y2U4ZjMyMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.X6hFGCtssUGjBIYkP-U0UwYOmMPzsX0e7NYB5vMqgsg",
  },
});

export const getTrendingMovies = async () => {
  const response = await axiosInstance.get(`trending/movie/day?language=en-US`);
  return response.data;
};

export const getInfoById = async (movieId) => {
  const response = await axiosInstance.get(`movie/${movieId}?language=en-US`);
  return response.data;
};

export const getCast = async (movieId) => {
  const response = await axiosInstance.get(
    `movie/${movieId}/credits?language=en-US`
  );
  return response.data;
};

export const getReviews = async (movieId) => {
  const response = await axiosInstance.get(
    `movie/${movieId}/reviews?language=en-US&page=1`
  );
  return response.data;
};

export const searchByQuery = async (query) => {
  const response = await axiosInstance.get(
    `search/movie?query=${query}&include_adult=false&language=en-US&page=1`
  );
  return response.data;
};
