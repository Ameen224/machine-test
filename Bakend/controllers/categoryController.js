// controller/categoryController

const category = require('../models/Category')
const subCategory = require('../models/Subcategory')
const { findOne } = require('../models/User')

// to get all category
const getAllCategory = async (req, res) => {
    try {
        const categories = await category.find()
        req.json(categories)
    } catch (error) {
        res.status(500).json({ message: "server error" })
    }
}

// to get all subCategory
const getAllsubCategories = async (req, res) => {
    try {
        const subCategory = await subCategory.find().populate('category', 'name')
        res.json(subCategory)
    } catch (error) {
        res.status(500).json({ message: "server error" })

    }
}

// to create category
const createCategory = async (req, res) => {
    try {
        const { name } = req.body
        const findcategory = await findOne({ name })
        if (findcategory) {
            return res.status(400).json({ message: "category already exist" })
        }
        const newCategory = new category({ name })
        await newCategory.save()

        res.status(201).json({
            message: "category created successfully",
            newCategory
        })
    } catch (error) {
        res.status(500).json({ message: "server error" })

    }
}

// to create subcategory
const creatSubCategory = async (req, res) => {
    try {
        const { name, categoryId } = req.body
        const subCategory = new subCategory({
            name,
            category: categoryId
        })
        await subCategory.save()
        res.status(201).json({
            message: "Sub-category created successfully",
            subCategory,
        })
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message })
    }
}

// Get subcategories by category
const getSubCategories = async (req, res) => {
  try {
    const { categoryId } = req.params
    const subCategories = await subCategory.find({ category: categoryId })
      .populate("category", "name")
     res.json(subCategories)
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}


module.exports={
    getSubCategories,
    getAllsubCategories,
    creatSubCategory,
    createCategory,
    getAllCategory
}