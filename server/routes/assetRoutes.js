import express from "express"
import { createAsset } from "../controllers/assetController.js"
import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";


const assetRoutes = express.Router();

assetRoutes.post("/", protect, authorize("Asset Manager"), upload.single("image"), createAsset);


export default assetRoutes;