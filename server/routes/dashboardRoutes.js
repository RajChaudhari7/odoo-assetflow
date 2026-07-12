import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
    getDashboardStats,
    recentAssets,
    recentAllocations,
    assetStatusChart
} from "../controllers/dashboardController.js";

const dashboardRoutes = express.Router();

dashboardRoutes.get(
    "/stats",
    protect,
    getDashboardStats
);

dashboardRoutes.get(
    "/recent-assets",
    protect,
    recentAssets
);

dashboardRoutes.get(
    "/recent-allocations",
    protect,
    recentAllocations
);

dashboardRoutes.get(
    "/asset-chart",
    protect,
    assetStatusChart
);

export default dashboardRoutes;