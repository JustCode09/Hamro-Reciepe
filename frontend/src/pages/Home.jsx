import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/recipes");
        setRecipes(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRecipes();
  }, []);

  return (
    <div className="mt-8">
      <h1 className="text-3xl font-bold text-center text-orange-600 mb-6">
        🍴 Latest Recipes
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((r) => (
          <Link
            key={r._id}
            to={`/recipe/${r._id}`}
            className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 block"
          >
            {/* Recipe Image */}
            {r.image && (
              <img
                src={`http://localhost:5000${r.image}`}
                alt={r.title}
                className="h-48 w-full object-cover rounded-lg mb-3"
              />
            )}

            <h3 className="text-xl font-semibold mb-2">{r.title}</h3>
            <p className="text-gray-600 line-clamp-3">{r.description}</p>
            <p className="text-sm text-gray-500 mt-2">
              👨‍🍳 by {r.createdBy?.username || "Unknown"}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
