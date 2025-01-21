import React, { useState } from "react";
import useFetchData from "../usefetchData";
import { useNavigate } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { NavMenu } from "./NavMenu";
export const Navbar = () => {
  const { data, loading, error } = useFetchData("categories");
  const navigate = useNavigate();

  const [menu, setmenu] = useState(false);

  return (
    <div className="sticky top-0 px-10 py-2 bg-[#ffbc00] shadow-md z-50">
      <div className="w-[85%] m-auto flex items-end gap-10 lg:justify-between lg:items-center">
        <div className="w-[15%] cursor-pointer" onClick={() => navigate("/")}>
          <img src="/images/logo2.png" alt="logo" className="w-full" />
        </div>

        <div className="flex items-center gap-5 lg:hidden">
          {data.map((ele, i) => {
            return (
              <p
                key={i}
                className="text-black font-NBold cursor-pointer px-2 hover:text-primary"
                onClick={() => navigate(`/category/${ele.id}`)}
              >
                {ele.name}
              </p>
            );
          })}
        </div>
        {/* hamburger */}
        <div className="lg:block hidden">
          <NavMenu />
        </div>
      </div>
    </div>
  );
};
