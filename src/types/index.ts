interface SearchMovie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type: string;
  Genre?: string;
}

interface MovieDetails {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Array<{ Source: string; Value: string }>;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
}

interface MovieCardProps {
  movie: SearchMovie;
  type?: string;
  onClick?: (movie: SearchMovie) => void;
  handleRemoveFromWishlist?: (id: string) => void;
}

interface TopSearchProps {
  searchQuery: string;
  handleSearch: (value: string) => void;
  type: "movie" | "series";
  handleTypeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  isLoading?: boolean;
}

interface MovieDetailsProps {
  movie: MovieDetails;
  onClose: () => void;
}

interface FiltersProps {
  filters: {
    year: string;
    title: string;
  };
  onChange: (filters: { year: string; title: string }) => void;
}

interface ToastProps {
  id: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
  onClose: (id: string) => void;
}

interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
}

interface ToastContextType {
  addToast: (
    message: string,
    type: "success" | "error" | "info" | "warning"
  ) => void;
  removeToast: (id: string) => void;
  toasts: Toast[];
}

export type {
  SearchMovie,
  MovieDetails,
  MovieCardProps,
  TopSearchProps,
  SearchBarProps,
  MovieDetailsProps,
  FiltersProps,
  ToastProps,
  ToastContextType,
  Toast,
};
