import React from "react";
import { Route, Routes } from "react-router-dom";
import { Watch } from "./Watch";
import { Home } from "./Home";
export const AllRoutes = () => {
  return (
    <Routes>
      <Route element={<Home />} path="/" />
      <Route element={<Watch />} path="/watch/:movieId" />
    </Routes>
  );
};
