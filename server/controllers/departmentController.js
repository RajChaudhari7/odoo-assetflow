import Department from "../models/Department.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

// api to create deprtment 
export const createDepartment = asyncHandler(async (req, res) => {

    const { name, description } = req.body;

    if (!name) {

        throw new ApiError(400, "Department name is requireds");

    }

    const existingDepartment = await Department.findOne({ name });

    if (existingDepartment) {

        throw new ApiError(400, "Department already exists");

    }

    const department = await Department.create({

        name,
        description,

    });

    return res.status(201).json(
        new ApiResponse(
            201,
            department,
            "Department created successfully"
        )
    );

});

// api to get department 
export const getDepartments = asyncHandler(async (req, res) => {


    const departments = await Department.find().populate("head", "fullName email");

    return res.status(200).json(
        new ApiResponse(200, departments)
    );

});

// api to get department By ID
export const getDepartmentId = asyncHandler(async (req, res) => {

    const department = await Department.findById(req.params.id)
        .populate("head", "fullName email");

    if (!department) {
        throw new ApiError(404, "Department not found");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            department,
            "Department fetched successfully"
        )
    );

});

// api to update department
export const updateDepartment = asyncHandler(async (req, res) => {


    const department = await Department.findById(req.params.id);

    if (!department) {

        throw new ApiError(404, "Department not found");

    }

    department.name = req.body.name || department.name;
    department.description = req.body.description || department.description;
    department.status = req.body.status || department.status;

    await department.save();

    return res.status(200).json(new ApiResponse(200, department, "Department updated successfully"));

});

// api to delete the department
export const deleteDepartment = asyncHandler(async (req, res) => {

    const department = await Department.findById(req.params.id);

    if (!department) {
        throw new ApiError(404, "Department not found");
    }

    await department.deleteOne();

    return res.status(200).json(new ApiResponse(200, {}, "Department deleted successfully"));

});