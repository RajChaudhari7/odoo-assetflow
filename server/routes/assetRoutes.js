import express from "express";

import {
    createAsset,
    getAssets,
    getAsset,
    updateAsset,
    deleteAsset
} from "../controllers/assetController.js";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", protect, authorize("Asset Manager"), createAsset);

router.get("/", protect, getAssets);

router.get("/:id", protect, getAsset);

router.put("/:id", protect, authorize("Asset Manager"), updateAsset);

router.delete("/:id", protect, authorize("Asset Manager"), deleteAsset);

export default router;