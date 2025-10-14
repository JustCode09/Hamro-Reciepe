import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function EditRecipe() {
  const { id } = useParams();
  const [form, setForm] = useState({});
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      const res = await axios.get(`http://localhost:5000/api/recipes/${id}`);
      setForm({
        title: res.data.title,
        description: res.data.description,
        ingredients: res.data.ingredients.join(","),
        steps: res.data.steps.join("."),
        category: res.data.category,
      });
    };
    fetchRecipe();
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      for (let key in form) formData.append(key, form[key]);
      if (image) formData.append("image", image);

      await axios.put(`http://localhost:5000/api/recipes/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });
      alert("Recipe updated successfully!");
      navigate(`/recipe/${id}`);
    } catch (err) {
      alert(err.response?.data?.error || "Error updating recipe");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md p-6 mt-10 rounded-xl">
      <h2 className="text-2xl font-bold text-center mb-4 text-orange-600">
        Edit Recipe
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={form.title || ""}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <textarea
          name="description"
          value={form.description || ""}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <input
          type="text"
          name="ingredients"
          value={form.ingredients || ""}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <textarea
          name="steps"
          value={form.steps || ""}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <input
          type="text"
          name="category"
          value={form.category || ""}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="border p-2 w-full rounded"
        />

        <button className="bg-yellow-500 text-white px-4 py-2 rounded w-full hover:bg-yellow-600">
          Update Recipe
        </button>
      </form>
    </div>
  );
}
