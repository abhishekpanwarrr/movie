import { SearchMovie } from "../types";

const WISHLIST_KEY = "movieWishlist";

const getWishlist = (): SearchMovie[] => {
  if (typeof window === "undefined") return [];
  const wishlist = localStorage.getItem(WISHLIST_KEY);
  return wishlist ? JSON.parse(wishlist) : [];
};

const addToWishlist = (movie: SearchMovie) => {
  const wishlist = getWishlist();
  const id = movie.imdbID;
  const alreadyExist = wishlist.filter((item) => item.imdbID === id);

  if (alreadyExist.length === 1) {
    return "Movie already in wishlist";
  }
  const updatedWishlist = [...wishlist, movie];
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(updatedWishlist));
  return "Movie added in wishlist";
};

const removeFromWishlist = (imdbID: string): void => {
  const wishlist = getWishlist();
  const updatedWishlist = wishlist.filter((movie) => movie.imdbID !== imdbID);
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(updatedWishlist));
};

const getStorageItem = (key: string) => {
  if (typeof window !== "undefined") {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
  return null;
};

const setStorageItem = (key: string, value: any): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export {
  addToWishlist,
  removeFromWishlist,
  getStorageItem,
  setStorageItem,
  getWishlist,
};
