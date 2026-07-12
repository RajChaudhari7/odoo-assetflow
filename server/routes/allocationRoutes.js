import express from "express";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

import {
    allocateAsset,
    getAllocations,
    getAllocation,
    returnAsset,
    transferAsset
} from "../controllers/allocationController.js";

const allocationRoutes = express.Router();

allocationRoutes.post(
    "/",
    protect,
    authorize("Asset Manager"),
    allocateAsset
);

allocationRoutes.get(
    "/",
    protect,
    getAllocations
);

allocationRoutes.get(
    "/:id",
    protect,
    getAllocation
);

allocationRoutes.put(
    "/return/:id",
    protect,
    authorize("Asset Manager"),
    returnAsset
);

allocationRoutes.put(
    "/transfer/:id",
    protect,
    authorize("Asset Manager"),
    transferAsset
);

export default allocationRoutes;