import { FC } from "react";
import { Search, Loader2 } from "lucide-react";
import { SearchBarProps } from "../types";

export const SearchBar: FC<SearchBarProps> = ({
  value,
  onChange,
  isLoading,
}) => {
  return (
    <div className="relative w-full">
      {isLoading ? (
        <Loader2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 animate-spin" />
      ) : (
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      )}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search movies or series"
        className="w-full pl-10 pr-4 py-3 rounded-md h-10 outline-none border shadow-sm 
                  border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 
                  text-gray-900 dark:text-gray-100"
      />
    </div>
  );
};
