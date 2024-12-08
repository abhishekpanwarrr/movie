import { FC } from "react";
import { TopSearchProps } from "../types";
import { SearchBar } from "./SearchBar";

const TopSearch: FC<TopSearchProps> = ({
  searchQuery,
  handleSearch,
  type,
  handleTypeChange,
}) => {
  return (
    <div className="flex items-center gap-10 my-4">
      <SearchBar
        value={searchQuery}
        onChange={handleSearch}
        isLoading={false}
      />
      <select
        value={type}
        onChange={handleTypeChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none "
      >
        <option value="movie">Movies</option>
        <option value="series">Series</option>
      </select>
    </div>
  );
};

export default TopSearch;
