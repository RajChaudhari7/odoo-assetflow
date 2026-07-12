import imagekit from "../config/imagekit.js";
import Asset from "../models/Asset.js";
import Category from "../models/Category.js";
import Department from "../models/Department.js";



// api to generate asset ID
const generateAssetId = async () => {

    const totalAssets = await Asset.countDocuments();

    return `AST-${String(totalAssets + 1).padStart(4, "0")}`;

};

// api to create asset
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
                message: "Serial number already exists",
            });
        }

        let imageUrl = "";

        if (req.file) {
            const uploadedImage = await imagekit.upload({
                file: req.file.buffer,
                fileName: `${Date.now()}-${req.file.originalname}`,
            });

            imageUrl = uploadedImage.url;
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
            remarks,
            image: imageUrl,
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


