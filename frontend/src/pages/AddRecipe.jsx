import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config/api";

export default function AddRecipe() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    ingredients: "",
    steps: "",
    category: "",
  });
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    
    // Append all form fields
    for (let key in form) formData.append(key, form[key]);
    if (image) formData.append("image", image);

    // ✅ FIX: Send formData instead of form
    await axios.post(`${API_URL}/api/recipes`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    alert("Recipe added successfully!");
    navigate("/");
  } catch (err) {
    alert(err.response?.data?.error || "Error adding recipe");
  }
};

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md p-6 mt-10 rounded-xl">
      <h2 className="text-2xl font-bold text-center mb-4 text-orange-600">
        Add a New Recipe
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Recipe Title"
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Short Description"
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <input
          type="text"
          name="ingredients"
          placeholder="Ingredients (comma separated)"
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <textarea
          name="steps"
          placeholder="Steps (separate with a period)"
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <input
          type="text"
          name="category"
          placeholder="Category (e.g. Dessert, Nepali, Indian)"
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />

        {/* 👇 Image input */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="border p-2 w-full rounded"
        />

        <button className="bg-orange-500 text-white px-4 py-2 rounded w-full hover:bg-orange-600">
          Add Recipe
        </button>
      </form>
    </div>
  );
}
