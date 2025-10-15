import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "https://hamro-reciepe.onrender.com";

export default function RecipeDetail() {
  const { id } = useParams(); // This is the correct ID from the URL
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/recipes/${id}`);
        setRecipe(res.data);
      } catch (err) {
        console.log("Fetch recipe error:", err);
      }
    };
    fetchRecipe();
  }, [id]);

  const ensureAuth = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must login first");
      return null;
    }
    return token;
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this recipe?")) return;
    const token = ensureAuth();
    if (!token) return;
    try {
      await axios.delete(`${API_URL}/api/recipes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Recipe deleted successfully!");
      navigate("/");
    } catch (err) {
      console.log("Delete error:", err.response?.data || err);
      alert("Error deleting recipe");
    }
  };

  const handleEdit = () => {
    // Use the ID from URL params instead of recipe._id
    navigate(`/edit/${id}`);
  };

  if (!recipe) return <p className="text-center mt-10">Loading...</p>;

  const isCreator = recipe.createdBy?._id === user?.id;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow p-6 rounded-xl">
      {recipe.image && (
        <img
          src={`${API_URL}${recipe.image}`}
          alt={recipe.title}
          className="w-full h-72 object-cover rounded-xl mb-4"
        />
      )}

      <h2 className="text-3xl font-bold text-orange-600 mb-2">{recipe.title}</h2>
      <p className="text-gray-600 mb-4">{recipe.description}</p>

      <h3 className="text-lg font-semibold mb-2">Ingredients:</h3>
      <ul className="list-disc list-inside mb-4">
        {recipe.ingredients.map((ing, i) => (
          <li key={i}>{ing}</li>
        ))}
      </ul>

      <h3 className="text-lg font-semibold mb-2">Steps:</h3>
      <ol className="list-decimal list-inside mb-4">
        {recipe.steps.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ol>

      {isCreator && (
        <div className="flex gap-3 mt-4">
          <button
            onClick={handleEdit} // Use the fixed handleEdit function
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800"
          >
            Delete
          </button>
        </div>
      )}

      <p className="text-sm text-gray-500 mt-4">
        Posted by: {recipe.createdBy?.username || "Unknown"}
      </p>
    </div>
  );
}