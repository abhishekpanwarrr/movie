import { MovieCard } from "../components/MovieCard";
import useWishlist from "../hooks/useWishList";

const WishList = () => {
  const { wishlist, handleRemoveFromWishlist } = useWishlist();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-6 text-center dark:text-white">
          My Wishlist
        </h1>
        {wishlist.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-400">
            Your wishlist is empty. Add some movies!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
                type="wishlist"
                onClick={() => {}}
                handleRemoveFromWishlist={handleRemoveFromWishlist}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishList;
