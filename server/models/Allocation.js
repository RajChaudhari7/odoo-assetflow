import mongoose from "mongoose";

const allocationSchema = new mongoose.Schema(
    {
        asset: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Asset",
            required: true,
        },

        employee: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        allocatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        allocationDate: {
            type: Date,
            default: Date.now,
        },

        expectedReturnDate: {
            type: Date,
        },

        returnDate: {
            type: Date,
            default: null,
        },

        status: {
            type: String,
            enum: [
                "Allocated",
                "Returned"
            ],
            default: "Allocated",
        },

        remarks: {
            type: String,
            default: "",
        }

    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Allocation", allocationSchema);