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
  const navigate = useNavigate();
  const location = useLocation();
  const [menu, setmenu] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null); // Track active category

  const handleCategoryClick = (id) => {
    setActiveCategory(id); // Set the clicked category as active
    navigate(`/category/${id}`); // Navigate to the category
  };

  useEffect(() => {
    if (location.pathname === "/") {
      setActiveCategory(null);
    }
  }, [location]);

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
          <div className="">
            <InputGroup
              flex="1"
              startElement={<LuSearch />}
              className="border rounded-xl border-white w-[450px] md:w-[350px] sm:w-[200px] xs:w-[50%] focus-within:border-white"
            >
              <Input
                placeholder="Search movie or webseries"
                className="focus:outline-none text-white font-NRegular focus:ring-0 focus:border-white text-gray-800 placeholder-gray-400"
              />
            </InputGroup>
          </div>
          <div className="sm:hidden"></div>
          {/* hamburger */}
          <div className="lg:block hidden">
            <NavMenu data={data} />
          </div>
        </div>
      </div>
      <div className="w-[80%] xl:w-[95%] m-auto grid grid-cols-6 xl:grid-cols-5 lg:hidden gap-5 mt-5">
        {data.map((ele, i) => {
          const isActive = activeCategory === ele.id; // Check if the button is active
          return (
            <button
              key={i}
              className={`text-white font-NRegular cursor-pointer px-2 hover:text-secondary border rounded-xl py-2 ${
                isActive ? "border-secondary text-secondary" : "bg-transparent"
              }`} // Add conditional classes
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
