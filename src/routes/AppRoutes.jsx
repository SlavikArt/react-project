import React from "react";
import { Routes, Route, Navigate  } from "react-router-dom";
import Home from "../pages/Home";
import RecipeList from "../pages/RecipeList";
import RecipeDetail from "../pages/RecipeDetail";
import RecipeEdit from "../pages/RecipeEdit";
import RecipeUpload from "../pages/RecipeUpload";
import UserProfile from "../components/UserProfile";
import Login from "../components/Login";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/recipes" element={<RecipeList />} />
    <Route path="/recipes/add" element={<RecipeUpload />} />
    <Route path="/recipes/edit/:id" element={<RecipeEdit />} />
    <Route path="/recipes/:id" element={<RecipeDetail />} />
    <Route path="/profile" element={<UserProfile />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AppRoutes;
