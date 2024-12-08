import React, { useState, useEffect, useMemo } from "react";
import { useQuery } from "react-query";
import { MovieCard } from "../components/MovieCard";
import { MovieDetails } from "../components/MovieDetails";
import {
  fetchlMoviesAndSeries,
  getMovieOrSeriesDetailsById,
} from "../services/api";
import { SearchMovie } from "../types";
import { Filters } from "../components/Filters";
import TopSearch from "../components/TopSearch";
import Loader from "../components/Loader";
import Loader1 from "../components/Loader1";
import useDebounce from "../hooks/useDebounce";
import { AnimatePresence } from "framer-motion";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    year: "",
    title: "",
  });
  const [type, setType] = useState<"movie" | "series">("movie");
  const delayedQuery = useDebounce(searchQuery.trim(), 700);

  const { data: movies, isLoading: isSearching } = useQuery(
    ["movies", delayedQuery, type],
    () => fetchlMoviesAndSeries(delayedQuery, type),
    {
      enabled: true,
      staleTime: 1000 * 60 * 5,
    }
  );

  const { data: selectedMovie, isLoading: isLoadingDetails } = useQuery(
    ["specificMovie", selectedMovieId],
    () =>
      selectedMovieId ? getMovieOrSeriesDetailsById(selectedMovieId) : null,
    {
      enabled: !!selectedMovieId,
    }
  );

  const handleMovieClick = (movie: SearchMovie) => {
    setSelectedMovieId(movie.imdbID);
  };

  const filteredMovies = useMemo(() => {
    return (
      movies?.filter((movie) => {
        const matchesYear = !filters.year || movie.Year.includes(filters.year);
        const matchesTitle =
          !filters.title ||
          movie.Title.toLowerCase().includes(filters.title.toLowerCase());
        return matchesYear && matchesTitle;
      }) ?? []
    );
  }, [movies, filters]);

  useEffect(() => {
    if (selectedMovieId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedMovieId, isSearching]);

  const handleSearch = (value: string) => {
    setSearchQuery(value || "");
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value as "movie" | "series");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <TopSearch
          searchQuery={searchQuery}
          handleSearch={handleSearch}
          type={type}
          handleTypeChange={handleTypeChange}
        />
        <Filters
          filters={filters}
          onChange={(newFilters) => setFilters(newFilters)}
        />

        {isSearching && <Loader />}

        {filteredMovies.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMovies.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
                onClick={handleMovieClick}
              />
            ))}
          </div>
        )}

        {filteredMovies.length === 0 && !isSearching && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No movies found
            </p>
          </div>
        )}

        <AnimatePresence>
          {selectedMovie && (
            <MovieDetails
              movie={selectedMovie}
              onClose={() => setSelectedMovieId(null)}
            />
          )}
        </AnimatePresence>

        {isLoadingDetails && selectedMovieId && <Loader1 />}
      </main>
    </div>
  );
}

export default Home;
