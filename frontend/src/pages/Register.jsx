import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config/api";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    await axios.post(`${API_URL}/api/auth/register`, form);

      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.error || "Error during registration");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg p-6 mt-10 rounded-xl">
      <h2 className="text-2xl font-bold text-center mb-4">Create an Account</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="username" placeholder="Username" onChange={handleChange} className="border p-2 w-full rounded" />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} className="border p-2 w-full rounded" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="border p-2 w-full rounded" />
        <button className="bg-orange-500 text-white px-4 py-2 rounded w-full hover:bg-orange-600">Register</button>
      </form>
    </div>
  );
}
