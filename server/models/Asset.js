import mongoose from "mongoose";

const assetSchema = new mongoose.Schema(
    {
        assetId: {
            type: String,
            unique: true,
            required: true,
        },

        assetName: {
            type: String,
            required: true,
            trim: true,
        },

        serialNumber: {
            type: String,
            unique: true,
            sparse: true,
        },

        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },

        department: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Department",
            required: true,
        },

        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },

        purchaseDate: Date,

        purchaseCost: {
            type: Number,
            default: 0,
        },

        vendor: String,

        warrantyExpiry: Date,

        image: {
            type: String,
            default: "",
        },

        condition: {
            type: String,
            enum: [
                "New",
                "Good",
                "Fair",
                "Damaged"
            ],
            default: "New",
        },

        status: {
            type: String,
            enum: [
                "Available",
                "Allocated",
                "Maintenance",
                "Retired"
            ],
            default: "Available",
        },

        remarks: String,

    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Asset", assetSchema);