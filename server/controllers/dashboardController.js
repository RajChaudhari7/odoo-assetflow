import Asset from "../models/Asset.js";
import User from "../models/User.js";
import Department from "../models/Department.js";
import Category from "../models/Category.js";
import Allocation from "../models/Allocation.js";

export const getDashboardStats = async (req, res) => {

    try {

        const totalAssets = await Asset.countDocuments();

        const availableAssets = await Asset.countDocuments({
            status: "Available"
        });

        const allocatedAssets = await Asset.countDocuments({
            status: "Allocated"
        });

        const maintenanceAssets = await Asset.countDocuments({
            status: "Maintenance"
        });

        const retiredAssets = await Asset.countDocuments({
            status: "Retired"
        });

        const totalUsers = await User.countDocuments();

        const totalDepartments = await Department.countDocuments();

        const totalCategories = await Category.countDocuments();

        const activeAllocations = await Allocation.countDocuments({
            status: "Allocated"
        });

        res.status(200).json({

            success: true,

            stats: {

                totalAssets,

                availableAssets,

                allocatedAssets,

                maintenanceAssets,

                retiredAssets,

                totalUsers,

                totalDepartments,

                totalCategories,

                activeAllocations

            }

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

export const recentAssets = async (req, res) => {

    try {

        const assets = await Asset.find()

            .populate("category", "name")

            .populate("department", "name")

            .sort({ createdAt: -1 })

            .limit(5);

        res.status(200).json({

            success: true,

            assets

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

export const recentAllocations = async (req, res) => {

    try {

        const allocations = await Allocation.find()

            .populate("asset", "assetName assetId")

            .populate("employee", "fullName employeeId")

            .sort({ createdAt: -1 })

            .limit(5);

        res.status(200).json({

            success: true,

            allocations

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

export const assetStatusChart = async (req, res) => {

    try {

        const available = await Asset.countDocuments({
            status: "Available"
        });

        const allocated = await Asset.countDocuments({
            status: "Allocated"
        });

        const maintenance = await Asset.countDocuments({
            status: "Maintenance"
        });

        const retired = await Asset.countDocuments({
            status: "Retired"
        });

        res.status(200).json({

            success: true,

            chart: [

                {
                    name: "Available",
                    value: available
                },

                {
                    name: "Allocated",
                    value: allocated
                },

                {
                    name: "Maintenance",
                    value: maintenance
                },

                {
                    name: "Retired",
                    value: retired
                }

            ]

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};