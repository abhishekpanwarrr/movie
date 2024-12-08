import { FC, useEffect } from "react";
import { X, Star, Clock, Award, Calendar, Film } from "lucide-react";
import { MovieDetailsProps } from "../types";
import { motion } from "framer-motion";

const modalVariants = {
  hidden: { opacity: 0, y: "-50%" },
  visible: { opacity: 1, y: "0%" },
  exit: { opacity: 0, y: "-50%" },
};

export const MovieDetails: FC<MovieDetailsProps> = ({ movie, onClose }) => {
  const imdbRating = parseFloat(movie.imdbRating);
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [onClose]);
  return (
    <div
      className="fixed inset-0 p-4 rounded-md  bg-black bg-opacity-90 flex items-center justify-center z-50"
      role="dialog"
      aria-labelledby="movie-title"
      aria-modal="true"
    >
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={modalVariants}
        transition={{ duration: 0.4 }}
        className="bg-white dark:bg-gray-800 max-h-[95vh] rounded-xl max-w-4xl w-full relative overflow-hidden shadow-lg"
      >
        <button
          onClick={onClose}
          className="absolute right-2 top-2 p-2 bg-red-500 hover:bg-red-400 rounded-full shadow-lg text-white "
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-2/5">
            {movie.Poster && movie.Poster !== "N/A" ? (
              <img
                src={movie.Poster}
                alt={`${movie.Title} Poster`}
                className="w-full h-96 md:h-[600px] object-cover"
              />
            ) : (
              <div className="w-full h-[600px] bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
                <Film className="w-20 h-20 text-gray-400 dark:text-gray-500" />
              </div>
            )}
          </div>
          <div className="w-full md:w-3/5 px-6 overflow-y-auto pt-6 pb-20 max-h-[600px] text-gray-900 dark:text-gray-200">
            <h2
              id="movie-title"
              className="text-3xl font-bold mb-2 dark:text-white"
            >
              {movie.Title}
            </h2>
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 mr-1" />
                <span>{imdbRating ? `${imdbRating}/10` : "N/A"}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-1" />
                <span>{movie.Runtime}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-1" />
                <span>{movie.Year}</span>
              </div>
              {movie.Awards !== "N/A" && (
                <div className="flex items-center">
                  <Award className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-1" />
                  <span>{movie.Awards}</span>
                </div>
              )}
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-1 dark:text-gray-300">
                  Plot
                </h3>
                <p className="text-gray-700 dark:text-gray-400">{movie.Plot}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold dark:text-gray-300">Director</h3>
                  <p className="text-gray-700 dark:text-gray-400">
                    {movie.Director}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold dark:text-gray-300">Genre</h3>
                  <p className="text-gray-700 dark:text-gray-400">
                    {movie.Genre}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold dark:text-gray-300">Cast</h3>
                  <p className="text-gray-700 dark:text-gray-400">
                    {movie.Actors}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold dark:text-gray-300">Language</h3>
                  <p className="text-gray-700 dark:text-gray-400">
                    {movie.Language}
                  </p>
                </div>
              </div>

              {movie.Ratings && movie.Ratings.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-2 dark:text-gray-300">
                    Ratings
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {movie.Ratings.map((rating) => (
                      <div
                        key={rating.Source}
                        className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg"
                      >
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {rating.Source}
                        </div>
                        <div className="font-semibold dark:text-white">
                          {rating.Value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
