import express from "express";
import multer from "multer";
import path from "path";
import Recipe from "../models/Recipe.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Create recipe
router.post("/", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const { title, description, ingredients, steps, category } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : "";

    const recipe = new Recipe({
      title,
      description,
      ingredients: ingredients ? ingredients.split(",").map(s => s.trim()).filter(Boolean) : [],
      steps: steps ? steps.split(".").map(s => s.trim()).filter(Boolean) : [],
      category,
      image,
      createdBy: req.user.id, // ✅ use id, not object
    });

    await recipe.save();
    res.status(201).json(recipe);
  } catch (err) {
    console.log("Create recipe error:", err);
    res.status(400).json({ error: err.message });
  }
});

// Get all recipes
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find()
      .sort({ createdAt: -1 })
      .populate("createdBy", "username")
      .lean();
    res.json(recipes);
  } catch (err) {
    console.log("Get all recipes error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Get single recipe by id
router.get("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
      .populate("createdBy", "username"); // ✅ no comments/likes
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    res.json(recipe);
  } catch (err) {
    console.log("Get recipe error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Update recipe
router.put("/:id", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    if (recipe.createdBy.toString() !== req.user.id) return res.status(403).json({ message: "Not authorized" });

    const { title, description, ingredients, steps, category } = req.body;
    if (title) recipe.title = title;
    if (description) recipe.description = description;
    if (ingredients) recipe.ingredients = ingredients.split(",").map(s => s.trim()).filter(Boolean);
    if (steps) recipe.steps = steps.split(".").map(s => s.trim()).filter(Boolean);
    if (category) recipe.category = category;
    if (req.file) recipe.image = `/uploads/${req.file.filename}`;

    await recipe.save();
    res.json(recipe);
  } catch (err) {
    console.log("Update recipe error:", err);
    res.status(400).json({ error: err.message });
  }
});

// Delete recipe
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    if (recipe.createdBy.toString() !== req.user.id) return res.status(403).json({ message: "Not authorized" });

    await recipe.deleteOne(); // ✅ modern way
    res.json({ message: "Recipe deleted" });
  } catch (err) {
    console.log("Delete recipe error:", err);
    res.status(400).json({ error: err.message });
  }
});

export default router;
