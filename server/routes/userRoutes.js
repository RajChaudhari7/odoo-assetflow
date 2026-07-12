import express from "express"
import { deleteEmployee, getEmployee, getEmployees, updateEmployee } from "../controllers/userController.js"
import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";


const userRoutes = express.Router();

userRoutes.get("/", protect, getEmployees);
userRoutes.get("/:id", protect, getEmployee);
userRoutes.put("/:id", protect, authorize("Asset Manager"), updateEmployee);
userRoutes.delete("/:id", protect, authorize, deleteEmployee);

export default userRoutes;