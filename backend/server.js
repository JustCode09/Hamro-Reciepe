import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/authRoutes.js";
import recipeRoutes from "./routes/recipeRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

mongoose.connect(process.env.MONGO_URI)
  .then(()=> console.log("✅ MongoDB Connected"))
  .catch((err)=> console.log(err));

app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);

app.get("/", (req,res) => res.send("Hamro Recipes API Running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));

/**
 * Hamro Recipes - Recipe Sharing Platform
 * Copyright (c) 2024 [Your Name]
 * Licensed under MIT License
 */
