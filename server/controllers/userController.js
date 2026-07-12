import Department from "../models/Department.js";
import User from "../models/User.js"


// api to getALlEmployess
export const getEmployees = async (req, res) => {

    try {

        const users = await User.find().select("-password").populate("department", "name");

        res.status(200).json({
            success: true,
            count: users.length,
            users
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// api to get single employee
export const getEmployee = async (req, res) => {

    try {

        const user = await User.findById(req.params.id).select("-password").populate("department", "name");

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });

            res.status(200).json({
                success: true,
                user
            });

        }

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        })

    }

};

// api to update employee
export const updateEmployee = async (req, res) => {

    try {

        const {
            fullName,
            email,
            phone,
            role,
            department,
            isActive
        } = req.body;

        const user = await User.findById(req.params.id);

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });

        }

        if (department) {

            const dep = await Department.findById(department);

            if (!dep) {

                return res.status(404).json({ success: false, message: "Department not found" });

            }

        }

        user.fullName = fullName || user.fullName;
        user.email = email || user.email;
        user.phone = phone || user.phone;
        user.role = role || user.role;
        user.department = department || user.department;

        if (typeof isActive === "boolean") {

            user.isActive = isActive;

        }

        await user.save();

        const updatedUser = await User.findById(user._id)
            .select("-password")
            .populate("department", "name");

        res.status(200).json({
            success: true,
            message: "Employee Updated Successfully",
            user: updatedUser
        });

    } catch (error) {

        res.status(500).json({ success: false, message: error.message });

    }

};

// api to delete employee
export const deleteEmployee = async (req, res) => {

    try {

        const user = await User.findById(req.params.id);

        if (!user) {

            return res.status(404).json({ success: false, message: "Employee not found" });

        }

        await user.deleteOne();

        res.status(200).json({
            success: true,
            message: "Employee Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

}
