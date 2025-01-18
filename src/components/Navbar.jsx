import React from "react";
import useFetchData from "../usefetchData";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const { data, loading, error } = useFetchData("categories");
   const navigate = useNavigate()

  return (
    <div className="px-10 py-2 bg-[#ffbc00]">
      <div className="w-[85%] m-auto flex items-end gap-10">
        <div className="w-[15%] cursor-pointer" onClick={()=>navigate("/")}>
          <img src="/images/logo2.png" alt="logo" className="w-full" />
        </div>
        <div className="flex items-center gap-5">
          {data.map((ele, i) => {
            return (
              <p
                key={i}
                className="text-black font-NBold cursor-pointer px-2 hover:text-primary"
              >
                {ele.name}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};
