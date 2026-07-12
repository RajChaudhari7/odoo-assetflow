import Allocation from "../models/Allocation.js";
import Asset from "../models/Asset.js";
import User from "../models/User.js";

// allocate asset
export const allocateAsset = async (req, res) => {

    try {

        const {
            asset,
            employee,
            expectedReturnDate,
            remarks
        } = req.body;

        const assetData = await Asset.findById(asset);

        if (!assetData) {

            return res.status(404).json({
                success: false,
                message: "Asset not found"
            });

        }

        if (assetData.status !== "Available") {

            return res.status(400).json({
                success: false,
                message: "Asset is not available"
            });

        }

        const employeeData = await User.findById(employee);

        if (!employeeData) {

            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });

        }

        const allocation = await Allocation.create({

            asset,

            employee,

            allocatedBy: req.user._id,

            expectedReturnDate,

            remarks

        });

        assetData.status = "Allocated";

        assetData.assignedTo = employee;

        await assetData.save();

        res.status(201).json({

            success: true,

            message: "Asset Allocated Successfully",

            allocation

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// get all alocations
export const getAllocations = async (req, res) => {

    try {

        const {
            status,
            employee,
            asset,
            page = 1,
            limit = 10
        } = req.query;

        const query = {};

        if (status)
            query.status = status;

        if (employee)
            query.employee = employee;

        if (asset)
            query.asset = asset;

        const total = await Allocation.countDocuments(query);

        const allocations = await Allocation.find(query)

            .populate("asset", "assetId assetName")

            .populate("employee", "fullName employeeId")

            .populate("allocatedBy", "fullName")

            .sort({ createdAt: -1 })

            .skip((page - 1) * limit)

            .limit(Number(limit));

        res.status(200).json({

            success: true,

            total,

            page,

            pages: Math.ceil(total / limit),

            allocations

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
// get allocation by id
export const getAllocation = async (req, res) => {

    try {

        const allocation = await Allocation.findById(req.params.id)
            .populate("asset")
            .populate("employee")
            .populate("allocatedBy");

        if (!allocation) {
            return res.status(404).json({
                success: false,
                message: "Allocation not found"
            });
        }

        res.status(200).json({
            success: true,
            allocation
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Return Asset
export const returnAsset = async (req, res) => {

    try {

        const allocation = await Allocation.findById(req.params.id);

        if (!allocation) {
            return res.status(404).json({
                success: false,
                message: "Allocation not found"
            });
        }

        if (allocation.status === "Returned") {
            return res.status(400).json({
                success: false,
                message: "Asset already returned"
            });
        }

        allocation.status = "Returned";
        allocation.returnDate = new Date();

        await allocation.save();

        const asset = await Asset.findById(allocation.asset);

        asset.status = "Available";
        asset.assignedTo = null;

        await asset.save();

        res.status(200).json({
            success: true,
            message: "Asset Returned Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Transfer Asset
export const transferAsset = async (req, res) => {

    try {

        const { employee } = req.body;

        const allocation = await Allocation.findById(req.params.id);

        if (!allocation) {
            return res.status(404).json({
                success: false,
                message: "Allocation not found"
            });
        }

        if (allocation.status === "Returned") {
            return res.status(400).json({
                success: false,
                message: "Cannot transfer a returned asset"
            });
        }

        const employeeExists = await User.findById(employee);

        if (!employeeExists) {
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        }

        allocation.employee = employee;

        await allocation.save();

        const asset = await Asset.findById(allocation.asset);

        asset.assignedTo = employee;

        await asset.save();

        res.status(200).json({
            success: true,
            message: "Asset transferred successfully",
            allocation
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};