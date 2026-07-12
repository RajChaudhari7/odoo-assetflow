import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import Department from "../models/Department.js";

// api to login
export const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found",
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials",
            });
        }

        const userData = user.toObject();
        delete userData.password;

        res.status(200).json({
            success: true,
            token: generateToken(user._id),
            user: userData,
        });
    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

// api to register
export const register = async (req, res) => {
    try {

        const {
            fullName,
            email,
            password,
            employeeId,
            phone,
            department,
            role
        } = req.body;

        if (!fullName || !email || !password || !employeeId) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields",
            });
        }

        // Check existing user
        const existingUser = await User.findOne({
            $or: [
                { email },
                { employeeId }
            ]
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        // Validate department (optional)
        if (department) {
            const departmentExists = await Department.findById(department);

            if (!departmentExists) {
                return res.status(404).json({
                    success: false,
                    message: "Department not found",
                });
            }
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            fullName,
            email,
            password: hashedPassword,
            employeeId,
            phone,
            department,
            role,
        });

        const userData = user.toObject();
        delete userData.password;

        res.status(201).json({
            success: true,
            message: "Employee registered successfully",
            user: userData,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};