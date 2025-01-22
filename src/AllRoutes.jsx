import React from "react";
import { Route, Routes } from "react-router-dom";
import { Watch } from "./pages/Watch";
import { Home } from "./pages/Home";
import { Category } from "./pages/category";
import { SldcTable } from "./pages/SldcTable";
export const AllRoutes = () => {
  return (
    <Routes>
      <Route element={<Home />} path="/" />
      <Route element={<Watch />} path="/watch/:movieId" />
      <Route element={<Category/>} path="/category/:id"/>
      <Route element={<SldcTable/>} path="/sldc"/>
    </Routes>
  );
};
