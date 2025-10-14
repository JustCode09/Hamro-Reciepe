// backend/models/Recipe.js
import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  ingredients: [String],
  steps: [String],
  category: String,
  image: { type: String, default: "" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // ✅ important
}, { timestamps: true }); // optional: keeps createdAt/updatedAt

export default mongoose.model("Recipe", recipeSchema);
