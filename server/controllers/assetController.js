import Asset from "../models/Asset.js";
import Category from "../models/Category.js";
import Department from "../models/Department.js";

// Generate Asset ID
const generateAssetId = async () => {
    const totalAssets = await Asset.countDocuments();
    return `AST-${String(totalAssets + 1).padStart(4, "0")}`;
};

// Create Asset
export const createAsset = async (req, res) => {
    try {

        const {
            assetName,
            serialNumber,
            category,
            department,
            purchaseDate,
            purchaseCost,
            vendor,
            warrantyExpiry,
            condition,
            remarks
        } = req.body;

        const categoryExists = await Category.findById(category);

        if (!categoryExists) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        const departmentExists = await Department.findById(department);

        if (!departmentExists) {
            return res.status(404).json({
                success: false,
                message: "Department not found",
            });
        }

        const existingAsset = await Asset.findOne({ serialNumber });

        if (existingAsset) {
            return res.status(400).json({
                success: false,
                message: "Serial Number already exists",
            });
        }

        const asset = await Asset.create({
            assetId: await generateAssetId(),
            assetName,
            serialNumber,
            category,
            department,
            purchaseDate,
            purchaseCost,
            vendor,
            warrantyExpiry,
            condition,
            remarks
        });

        res.status(201).json({
            success: true,
            message: "Asset Created Successfully",
            asset
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// get all assets
export const getAssets = async (req, res) => {

    try {

        const assets = await Asset.find()
            .populate("category", "name")
            .populate("department", "name")
            .populate("assignedTo", "fullName employeeId email");

        res.status(200).json({
            success: true,
            count: assets.length,
            assets
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// get asset by id
export const getAsset = async (req, res) => {

    try {

        const asset = await Asset.findById(req.params.id)
            .populate("category", "name")
            .populate("department", "name")
            .populate("assignedTo", "fullName employeeId email");

        if (!asset) {
            return res.status(404).json({
                success: false,
                message: "Asset not found"
            });
        }

        res.status(200).json({
            success: true,
            asset
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// update asset
export const updateAsset = async (req, res) => {

    try {

        const asset = await Asset.findById(req.params.id);

        if (!asset) {
            return res.status(404).json({
                success: false,
                message: "Asset not found"
            });
        }

        const {
            assetName,
            serialNumber,
            category,
            department,
            purchaseDate,
            purchaseCost,
            vendor,
            warrantyExpiry,
            condition,
            status,
            remarks
        } = req.body;

        if (category) {

            const exists = await Category.findById(category);

            if (!exists) {
                return res.status(404).json({
                    success: false,
                    message: "Category not found"
                });
            }

            asset.category = category;
        }

        if (department) {

            const exists = await Department.findById(department);

            if (!exists) {
                return res.status(404).json({
                    success: false,
                    message: "Department not found"
                });
            }

            asset.department = department;
        }

        if (serialNumber) {

            const duplicate = await Asset.findOne({
                serialNumber,
                _id: { $ne: asset._id }
            });

            if (duplicate) {
                return res.status(400).json({
                    success: false,
                    message: "Serial Number already exists"
                });
            }

            asset.serialNumber = serialNumber;
        }

        asset.assetName = assetName || asset.assetName;
        asset.purchaseDate = purchaseDate || asset.purchaseDate;
        asset.purchaseCost = purchaseCost || asset.purchaseCost;
        asset.vendor = vendor || asset.vendor;
        asset.warrantyExpiry = warrantyExpiry || asset.warrantyExpiry;
        asset.condition = condition || asset.condition;
        asset.status = status || asset.status;
        asset.remarks = remarks || asset.remarks;

        await asset.save();

        res.status(200).json({
            success: true,
            message: "Asset Updated Successfully",
            asset
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// delete asset
export const deleteAsset = async (req, res) => {

    try {

        const asset = await Asset.findById(req.params.id);

        if (!asset) {
            return res.status(404).json({
                success: false,
                message: "Asset not found"
            });
        }

        await asset.deleteOne();

        res.status(200).json({
            success: true,
            message: "Asset Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};