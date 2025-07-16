// controller/productController

const product = require('../models/Product')

// for search products 
const searchProducts = async (req, res) => {
    try {
        const { query } = req.query;
        const products = await product.find({
            name: { $regex: query, $options: "i" },
        });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// suggestion of search 
const getSearchSuggestions = async (req, res) => {
    try {
        const { query } = req.query;
        const suggestions = await Product.find({
            name: { $regex: query, $options: "i" },
        }).select("name").limit(5);

        res.json(suggestions.map(p => p.name));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// all product with pgination
const getProducts = async (req, res) => {
    try {
        const { subCategory, page = 1, limit = 10 } = req.query;

        const filter = {};
        if (subCategory) filter.subCategory = subCategory;

        const products = await Product.find(filter)
            .populate("subCategory")
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const total = await product.countDocuments(filter);

        res.json({
            products,
            totalPages: Math.ceil(total / limit),
            currentPage: Number(page),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// to get single product 
const getoneProduct = async (req, res) => {
    try {
        const product = await product.findById(req.params.id).populate("subCategory");
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// to crate new product 
const createProduct = async (req, res) => {
    try {
        const { name, description, subCategory, variants } = req.body;
        const images = req.files.map(file => file.filename);
        const parsedVariants = JSON.parse(variants);
        const product = await product.create({
            name,
            description,
            subCategory,
            variants: parsedVariants,
            images
        });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// edit the product 
const updateProduct = async (req, res) => {
    try {
        const updated = await product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!updated) return res.status(404).json({ message: "Product not found" });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// delete the product 
const deleteProduct = async (req, res) => {
    try {
        const removed = await product.findByIdAndDelete(req.params.id);
        if (!removed) return res.status(404).json({ message: "Product not found" });
        res.json({ message: "Product deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    searchProducts,
    getSearchSuggestions,
    getProducts,
    getoneProduct,
    createProduct,
    updateProduct,
    deleteProduct
};

