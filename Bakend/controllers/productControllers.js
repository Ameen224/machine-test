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
        console.error(" Error:", error)

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

        const products = await product.find(filter)
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
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// to crate new product 
const createProduct = async (req, res) => {
    try {
        const { name, description, subCategory, variants } = req.body;
        
        const images = req.files.map(file => file.filename);
        let parsedVariants
        if (typeof req.body.variants === 'string') {
            parsedVariants = JSON.parse(req.body.variants)
        } else {
            parsedVariants = req.body.variants
        }
        const Product = await product.create({
            name,
            description,
            subCategory,
            variants: parsedVariants,
            images
        });
        res.status(201).json(Product);
    } catch (error) {
        console.error(" Error:", error)

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

