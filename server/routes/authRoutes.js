import express from "express";
import { login, register } from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const authRoutes = express.Router();

authRoutes.post("/login", login);

// only asset manager can register users
authRoutes.post("/register", protect, authorize("Asset Manager"), register);

export default authRoutes;

