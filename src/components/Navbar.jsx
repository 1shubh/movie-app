import React, { useEffect, useState } from "react";
import useFetchData from "../usefetchData";
import { useLocation, useNavigate } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { NavMenu } from "./NavMenu";
import { Input } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import { InputGroup } from "./ui/input-group";

export const Navbar = () => {
  const { data, loading, error } = useFetchData("categories");
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetchData("content");
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [menu, setmenu] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [filteredMovies, setFilteredMovies] = useState([]);

  const handleCategoryClick = (id) => {
    setActiveCategory(id);
    navigate(`/category/${id}`);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearch(query);
    setIsSearching(query.trim() !== "");
    // Filter movies based on the search query
    if (query.trim() !== "" && movies?.length > 0) {
      const filtered = movies.filter((movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredMovies(filtered);
    } else {
      setFilteredMovies([]);
    }
  };
  // console.log(movies);

  useEffect(() => {
    if (search === "") {
      setIsSearching(false);
      setFilteredMovies([]);
    }
  }, [search]);

  useEffect(() => {
    if (location.pathname === "/") {
      setActiveCategory(null);
    }
  }, [location]);

  const handleSearch = () => {
    navigate(`/search-result/${search}`);
    setSearch("");
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <div className="sticky bg-[#1b2228] top-0 px-10 xl:px-0 sm:px-1 py-2 shadow-md z-50">
        <div className="w-[85%] xl:w-[90%] sm:w-[95%] m-auto flex items-center justify-between gap-10 lg:justify-between lg:items-center">
          <div
            className="w-[15%] sm:w-[20%] xs:w-[35%] cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src="/images/logo2.png" alt="logo" className="w-full" />
          </div>
          <div className="relative">
            <div className="flex gap-2">
              <InputGroup
                flex="1"
                startElement={<LuSearch />}
                onKeyDown={handleKeyPress}
                className={
                  isSearching
                    ? "border rounded-t-xl border-white w-[450px] md:w-[350px] sm:w-[200px] xs:w-[50%] focus-within:border-white"
                    : "border rounded-xl border-white w-[450px] md:w-[350px] sm:w-[200px] xs:w-[50%] focus-within:border-white"
                }
              >
                <Input
                  value={search}
                  onChange={handleSearchChange}
                  placeholder="Search movie or webseries"
                  className="focus:outline-none text-white font-NRegular focus:ring-0 focus:border-white text-gray-800 placeholder-gray-400"
                />
              </InputGroup>
              <button
                className={
                  !isSearching
                    ? "rounded-xl px-5 bg-slate-300 font-NRegular"
                    : "rounded-xl px-5 bg-secondary font-NRegular hover:bg-gray"
                }
                disabled={!isSearching}
                onClick={handleSearch}
              >
                Search
              </button>
            </div>

            {/* Search suggestions */}
            <div
              className={`absolute bg-white rounded-b-xl z-10 shadow-md w-[450px] md:w-[350px] sm:w-[200px] xs:w-[50%] ${
                isSearching && filteredMovies.length > 0 ? "block" : "hidden"
              }`}
            >
              {filteredMovies.map((movie, index) => (
                <div
                  key={index}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => {
                    navigate(`/watch/${movie.movieId}`);
                    setSearch("");
                    setIsSearching(false);
                  }}
                >
                  <p className="text-gray-800">{movie.title}</p>
                </div>
              ))}
              {isSearching && filteredMovies.length === 0 && (
                <div className="px-4 py-2 text-gray-500">No results found</div>
              )}
            </div>
          </div>
          <div className="sm:hidden"></div>
          {/* hamburger */}
          <div className="lg:block hidden">
            <NavMenu data={data} />
          </div>
        </div>
      </div>
      <div className="w-[80%] xl:w-[95%] m-auto grid grid-cols-6 2xl:grid-cols-5 xl:grid-cols-5 lg:hidden gap-5 mt-5">
        {data.map((ele, i) => {
          const isActive = activeCategory === ele.id;
          return (
            <button
              key={i}
              className={`text-white font-NRegular cursor-pointer px-2 hover:text-secondary border rounded-xl py-2 ${
                isActive ? "border-secondary text-secondary" : "bg-transparent"
              }`}
              onClick={() => handleCategoryClick(ele.id)}
            >
              {ele.name}
            </button>
          );
        })}
      </div>
    </>
  );
};
