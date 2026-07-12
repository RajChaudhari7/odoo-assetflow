import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },

        password: {
            type: String,
            required: true,
        },

        role: {
            type: String,
            enum: [
                "Asset Manager",
                "Department Head",
                "Employee",
            ],
            default: "Employee",
        },

        department: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Department",
            default: null,
        },

        employeeId: {
            type: String,
            unique: true,
            sparse: true,
        },

        phone: String,

        isActive: {
            type: Boolean,
            default: true,
        },
    },

    {
        timestamps: true,
    }
);

export default mongoose.model("User", userSchema);