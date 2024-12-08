import { FC, useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import { FiltersProps } from "../types";

export const Filters: FC<FiltersProps> = ({ filters, onChange }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const debouncedFilters = useDebounce(localFilters, 300);

  useEffect(() => {
    onChange(debouncedFilters);
  }, [debouncedFilters, onChange]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setLocalFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };
  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-4 mb-6">
      <h3 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
        Filter from searched movies
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label
            htmlFor="year"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Release Year
          </label>
          <input
            id="year"
            name="year"
            type="text"
            placeholder="e.g., 2020"
            value={localFilters.year}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md h-10 pl-5 outline-none border shadow-sm 
                    border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 
                    text-gray-900 dark:text-gray-100 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>
        <div>
          <label
            htmlFor="genre"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Title
          </label>
          <input
            id="genre"
            name="title"
            type="text"
            placeholder="e.g., Avangers"
            value={localFilters.title}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md h-10 pl-5 outline-none border shadow-sm 
                    border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 
                    text-gray-900 dark:text-gray-100 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>
      </div>
    </div>
  );
};
