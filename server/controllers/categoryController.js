import  Category  from "../models/Category.js";


// api to create category
export const createCategory = async (req, res) => {

    try {

        const { name, description } = req.body;

        if (!name) {

            return res.status(400).json({
                success: false,
                message: "Category name is required",
            });

        }

        const exists = await Category.findOne({ name });

        if (exists) {

            return res.status(400).json({ success: false, message: "Category already exists" });

        }

        const category = await Category.create({ name, description });

        res.status(201).json({ success: true, message: "Category created successfully", category });

    } catch (error) {

        res.status(500).json({ success: false, message: error.message });

    }

};

// api to get all get categories
export const getCategories = async (req, res) => {

    try {

        const categories = await Category.find();

        res.status(200).json({ success: true, count: categories.length, categories });

    } catch (error) {

        res.status(500).json({ success: false, message: error.message });

    }

};

// api to get category by ID 
export const getCategory = async (req, res) => {

    try {

        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }

        res.status(200).json({ success: true, category });

    } catch (error) {

        res.status(500).json({ success: false, message: error.message });

    }

};

// api to update category
export const updateCategory = async (req, res) => {

    try {

        const { name, description, status } = req.body;

        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }

        category.name = name || category.name;
        category.description = description || category.description;
        category.status = status || category.status;

        await category.save();

        res.status(200).json({ success: true, message: "Category updated successfully", category });

    } catch (error) {

        res.status(500).json({ success: false, message: error.message });

    }

};

// api to delete the category
export const deleteCategory = async (req, res) => {

    try {

        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        await category.deleteOne();

        res.status(200).json({
            success: true,
            message: "Category deleted successfully",
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};