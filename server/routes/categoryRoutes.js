import express from "express";
import { createCategory, deleteCategory, getCategories, getCategory, updateCategory } from "../controllers/categoryController.js"
import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";


const categoryRoutes = express.Router();

categoryRoutes.post("/", protect, authorize("Asset Manager"), createCategory);
categoryRoutes.get("/", protect, getCategories)
categoryRoutes.get("/:id", protect, getCategory);
categoryRoutes.put("/:id", protect, authorize("Asset Manager"), updateCategory);
categoryRoutes.delete("/:id", protect, authorize("Asset Manager"), deleteCategory);

export default categoryRoutes;