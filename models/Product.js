// models/product

const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    variants: [{
        ram: String,
        price: Number,
        quantity: Number
    }],
    subCategory: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory", required: true },
    images: [String],
})


module.exports = mongoose.model('Product', productSchema)