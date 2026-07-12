import mongoose from "mongoose"

const departmentSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },

    description: {
        type: String,
        default: "",
    },

    head: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },

    status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active"
    }

}, {
    timestamps: true
});

export default mongoose.model("Department",departmentSchema)