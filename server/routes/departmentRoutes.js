import express from "express"
import { createDepartment, deleteDepartment, getDepartmentId, getDepartments, updateDepartment } from "../controllers/departmentController.js"
import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";


const departmentRoutes = express.Router();

// Asset Manager Only
departmentRoutes.post("/", protect, authorize("Asset Manager"), createDepartment);
departmentRoutes.put("/:id", protect, authorize("Asset Manager"), updateDepartment);
departmentRoutes.delete("/:id", protect, authorize("Asset Manager"), deleteDepartment);

// all logged in users
departmentRoutes.get("/", protect, getDepartments);
departmentRoutes.get("/:id", protect, getDepartmentId);

export default departmentRoutes;

