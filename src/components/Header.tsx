import { Film, Moon, Sun, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Header = () => {
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme ? JSON.parse(storedTheme) : false;
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (theme) {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  const menuVariants = {
    hidden: { x: "-100%" },
    visible: { x: 0 },
  };

  return (
    <header className="shadow-sm sticky top-0 z-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Film
              className="w-8 h-8 text-blue-500"
              aria-label="Movie database"
            />
            <h1
              className="text-2xl font-bold text-gray-900 dark:text-gray-300"
              aria-label="MovieDB"
            >
              MovieDB
            </h1>
          </div>

          <button
            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 md:hidden"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? (
              <X className="text-gray-500 dark:text-gray-400" />
            ) : (
              <Menu className="text-gray-500 dark:text-gray-400" />
            )}
          </button>

          <div className="hidden md:flex items-center gap-4 justify-between">
            <div className="flex text-white items-center gap-4 justify-between">
              <Link
                to="/"
                className="hover:border-b text-gray-800 dark:text-white"
                aria-label="Home"
              >
                Home
              </Link>
              <Link
                to="/wishlist"
                aria-label="Wishlist"
                className="hover:border-b text-gray-800 dark:text-white"
              >
                WishList
              </Link>
            </div>
            <button
              className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
              onClick={() => setTheme((prev: boolean) => !prev)}
              aria-label={
                theme ? "Switch to dark theme" : "Switch to light theme"
              }
            >
              {theme ? (
                <Moon className="text-gray-500 dark:text-gray-400" />
              ) : (
                <Sun className="text-gray-500 dark:text-gray-400" />
              )}
            </button>
          </div>
        </div>
      </div>
      <motion.div
        initial="hidden"
        animate={isMenuOpen ? "visible" : "hidden"}
        variants={menuVariants}
        transition={{ type: "tween", duration: 0.3 }}
        className={`fixed top-0 left-0 h-screen w-64 bg-white dark:bg-gray-800 shadow-lg z-30 md:hidden`}
      >
        <div className="p-4 flex flex-col gap-4">
          <Link
            to="/"
            className="text-gray-800 dark:text-white text-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-md"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/wishlist"
            className="text-gray-800 dark:text-white text-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-md"
            onClick={() => setIsMenuOpen(false)}
          >
            WishList
          </Link>
          <button
            className="p-2 mt-4 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => {
              setTheme((prev: boolean) => !prev);
              setIsMenuOpen(false);
            }}
            aria-label={
              theme ? "Switch to dark theme" : "Switch to light theme"
            }
          >
            {theme ? (
              <Moon className="text-gray-500 dark:text-gray-400" />
            ) : (
              <Sun className="text-gray-500 dark:text-gray-400" />
            )}
          </button>
        </div>
      </motion.div>
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </header>
  );
};

export default Header;
