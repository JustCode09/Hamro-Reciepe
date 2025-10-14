import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-orange-500 text-white px-6 py-3 flex justify-between items-center shadow-md">
      <Link to="/" className="text-2xl font-bold">🍲 Hamro Recipes</Link>
      <div className="flex items-center gap-6">
        <Link to="/" className="hover:underline">Home</Link>
        {token ? (
          <>
            <Link to="/add" className="hover:underline">Add Recipe</Link>
            <button
              onClick={handleLogout}
              className="bg-white text-orange-600 px-3 py-1 rounded-lg font-semibold hover:bg-gray-200"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
