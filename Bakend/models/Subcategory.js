// models/Subcategory
const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema({
    name: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
});

module.exports = mongoose.model("SubCategory", subCategorySchema);
