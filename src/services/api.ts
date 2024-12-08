import axios from "axios";
import { SearchMovie, MovieDetails } from "../types";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const fetchlMoviesAndSeries = async (
  query: string = "all",
  type: "movie" | "series" = "movie",
  page: number = 1
): Promise<SearchMovie[]> => {
  const effectiveQuery = query || "all";

  const response = await axios.get(
    `${BASE_URL}/?apikey=${API_KEY}&s=${effectiveQuery}&type=${type}&page=${page}`
  );
  if (response.data.Response === "True") {
    return response.data.Search;
  }
  return [];
};

const getMovieOrSeriesDetailsById = async (
  imdbId: string
): Promise<MovieDetails> => {
  const response = await axios.get(
    `${BASE_URL}/?apikey=${API_KEY}&i=${imdbId}&plot=full`
  );
  if (response.data.Response === "True") {
    return response.data;
  }
  throw new Error("Movie not found");
};

export { fetchlMoviesAndSeries, getMovieOrSeriesDetailsById };
