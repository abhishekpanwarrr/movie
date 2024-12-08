import { FC } from "react";
import { Film, Heart, Trash2 } from "lucide-react";
import useWishlist from "../hooks/useWishList";
import { MovieCardProps, SearchMovie } from "../types";
import { motion } from "framer-motion";
import { useToast } from "../context/ToastProvider";

export const MovieCard: FC<MovieCardProps> = ({
  type,
  movie,
  onClick,
  handleRemoveFromWishlist,
}) => {
  const { addToast } = useToast();
  const { wishlist, handleAddToWishlist } = useWishlist();

  const existInWishlist = wishlist.filter(
    (item) => item.imdbID === movie.imdbID
  );

  const handleAddWishlist = (e: any, movie: SearchMovie) => {
    e.stopPropagation();
    const msg = handleAddToWishlist(movie);
    return addToast(
      `${msg}`,
      msg === "Movie already in wishlist" ? "error" : "success"
    );
  };

  function handleRemove(e: any, movie: SearchMovie) {
    e.stopPropagation();
    handleRemoveFromWishlist && handleRemoveFromWishlist(movie.imdbID);
    return addToast("Removed from wishlist", "warning");
  }
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      aria-label={`Movie: ${movie.Title}`}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer group relative"
      onClick={() => onClick && onClick(movie)}
    >
      <div className="relative overflow-hidden text-white rounded-md ">
        {movie.Poster && movie.Poster !== "N/A" ? (
          <div>
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="w-full h-96 object-cover transition-transform duration-500 ease-[cubic-bezier(0.25, 1, 0.5, 1)] transform group-hover:scale-110"
              loading="lazy"
            />

            <div className="absolute bottom-0 right-0 z-10 bg-[rgba(0,0,0,0.2)] w-full p-2 flex items-center justify-between">
              <span className="bg-yellow-100 text-yellow-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300 capitalize">
                {movie.Type}
              </span>
              {type !== "wishlist" && (
                <button
                  onClick={(e) => handleAddWishlist(e, movie)}
                  className=" p-2 bg-white hover:bg-gray-300 rounded-full"
                >
                  <Heart
                    className={`w-5 h-5 text-red-500 ${
                      existInWishlist[0]?.imdbID === movie?.imdbID &&
                      "fill-current"
                    }`}
                  />
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="w-full h-96 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <Film className="w-16 h-16 text-gray-400 dark:text-gray-500" />
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 line-clamp-2 text-gray-800 dark:text-gray-100 text-start">
          {movie.Title}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-gray-600 dark:text-gray-400">{movie.Year}</span>
          {type !== "wishlist" && (
            <div className="flex items-center gap-4 dark:text-white">
              <span>View Details</span>
            </div>
          )}
        </div>
        {type === "wishlist" && (
          <button
            className="absolute bottom-4 right-4  text-red-500 bg-gray-100 hover:bg-gray-200 p-1 rounded-full"
            onClick={(e: any) => handleRemove(e, movie)}
          >
            <Trash2 className="w-5 h-5" />
          </button>
        )}
      </div>
    </motion.div>
  );
};
