import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "https://hamro-reciepe.onrender.com";

export default function EditRecipe() {
  const { id } = useParams(); // Use the ID from URL params
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    title: "",
    description: "",
    ingredients: "",
    steps: "",
    category: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/recipes/${id}`);
        const recipe = res.data;
        
        // Convert arrays back to strings for the form
        setForm({
          title: recipe.title || "",
          description: recipe.description || "",
          ingredients: recipe.ingredients?.join(", ") || "",
          steps: recipe.steps?.join(". ") || "",
          category: recipe.category || "",
        });
        setLoading(false);
      } catch (err) {
        console.log("Error fetching recipe:", err);
        alert("Recipe not found");
        navigate("/");
      }
    };
    fetchRecipe();
  }, [id, navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first");
        return;
      }

      const formData = new FormData();
      for (let key in form) formData.append(key, form[key]);
      if (image) formData.append("image", image);

      await axios.put(`${API_URL}/api/recipes/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Recipe updated successfully!");
      navigate(`/recipe/${id}`);
    } catch (err) {
      alert(err.response?.data?.error || "Error updating recipe");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md p-6 mt-10 rounded-xl">
      <h2 className="text-2xl font-bold text-center mb-4 text-orange-600">
        Edit Recipe
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Recipe Title"
          value={form.title}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Short Description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <input
          type="text"
          name="ingredients"
          placeholder="Ingredients (comma separated)"
          value={form.ingredients}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <textarea
          name="steps"
          placeholder="Steps (separate with a period)"
          value={form.steps}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <input
          type="text"
          name="category"
          placeholder="Category (e.g. Dessert, Nepali, Indian)"
          value={form.category}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="border p-2 w-full rounded"
        />

        <button className="bg-orange-500 text-white px-4 py-2 rounded w-full hover:bg-orange-600">
          Update Recipe
        </button>
      </form>
    </div>
  );
}