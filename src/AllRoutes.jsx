import React from "react";
import { Route, Routes } from "react-router-dom";
import { Watch } from "./pages/Watch";
import { Home } from "./pages/Home";
import { Category } from "./pages/category";
import { SldcTable } from "./pages/SldcTable";
import { AddMovie } from "./pages/AddMovie";
import { SearchResult } from "./pages/SearchResult";
import { EditMovie } from "./pages/EditMovie";
import { EditSingleMovie } from "./pages/EditSingleMovie";
export const AllRoutes = () => {
  return (
    <Routes>
      <Route element={<Home />} path="/" />
      <Route element={<Watch />} path="/watch/:movieId" />
      <Route element={<Category />} path="/category/:id" />
      <Route element={<SldcTable />} path="/sldc" />
      <Route element={<AddMovie />} path="/add-movie" />
      <Route element={<SearchResult />} path="/search-result/:query" />
      <Route element={<EditMovie />} path="/edit-movie" />
      <Route element={<EditSingleMovie />} path="/edit-movie/:movieId" />
    </Routes>
  );
};
