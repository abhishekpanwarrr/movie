import { useEffect, useState } from "react";
import { SearchMovie } from "../types";
import { addToWishlist, getWishlist, removeFromWishlist } from "../utils/utils";

const useWishlist = () => {
  const [wishlist, setWishlist] = useState<SearchMovie[]>([]);

  useEffect(() => {
    setWishlist(getWishlist());
  }, []);

  const handleRemoveFromWishlist = (imdbID: string) => {
    removeFromWishlist(imdbID);
    return setWishlist(getWishlist());
  };
  const handleAddToWishlist = (movie: SearchMovie) => {
    const msg = addToWishlist(movie);
    return msg;
  };

  return { wishlist, handleRemoveFromWishlist, handleAddToWishlist };
};

export default useWishlist;
