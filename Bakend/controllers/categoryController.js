// controller/categoryController

const Category = require('../models/Category')
const SubCategory = require('../models/Subcategory')

// to get all category
const getAllCategory = async (req, res) => {
    try {
        const categories = await Category.find()
        res.json(categories)
    } catch (error) {
        console.error("Error in getAllCategory:", error);
        res.status(500).json({ message: "server error" })
    }
}

// to get all subCategory
const getAllsubCategories = async (req, res) => {
    try {
        
        const sub = await SubCategory.find().populate('category', 'name')
        res.json(sub)
    } catch (error) {
            console.error("Error in getAllsubCategories:", error);
        res.status(500).json({ message: "server error" })

    }
}

// to create category
const createCategory = async (req, res) => {
    try {
        const { name } = req.body

        const findcategory = await Category.findOne({ name })
        if (findcategory) {
            return res.status(400).json({ message: "category already exist" })
        }
        const newCategory = new Category({ name })
        await newCategory.save()

        res.status(201).json({
            message: "category created successfully",
            newCategory
        })
    } catch (error) {
        console.error("Error in createCategory:", error);
        res.status(500).json({ message: "Server error" });
    }
}

// to create subcategory
const creatSubCategory = async (req, res) => {
    try {
        const { name, categoryId } = req.body
        const subcategory = new SubCategory({
            name,
            category: categoryId
        })
        await subcategory.save()
        res.status(201).json({
            message: "Sub-category created successfully",
            subcategory,
        })
    } catch (error) {
        console.error("Error in createCategory:", error);
        res.status(500).json({ message: "Server error", error: error.message })
    }
}

// Get subcategories by category
const getSubCategories = async (req, res) => {
    try {
        const { categoryId } = req.params
        const subCategories = await SubCategory.find({ category: categoryId })
            .populate("category", "name")
        res.json(subCategories)
    } catch (error) {        
        console.error(" Error:", error)

        res.status(500).json({ message: "Server error", error: error.message })
    }
}


module.exports = {
    getSubCategories,
    getAllsubCategories,
    creatSubCategory,
    createCategory,
    getAllCategory
}