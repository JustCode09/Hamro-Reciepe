import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddRecipe from "./pages/AddRecipe";
import RecipeDetail from "./pages/RecipeDetail";
import EditRecipe from "./pages/EditRecipe";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add" element={<AddRecipe />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />   
          <Route path="/edit/:id" element={<EditRecipe />} />
        </Routes>
      </div>
    </div>
  );
}


/**
 * Hamro Recipes - Recipe Sharing Platform
 * Copyright (c) 2024 [Your Name]
 * Licensed under MIT License
 */