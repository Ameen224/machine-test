// routes/productRoutes
const express = require("express")
const {
  searchProducts,
  getSearchSuggestions,
  getProducts,
  getoneProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productControllers")
const auth = require("../middleware/authMiddleware")
const { validateProduct } = require("../middleware/validation")
const upload = require('../middleware/upload')

const router = express.Router()


router.get("/search", searchProducts)
router.get("/suggestions", getSearchSuggestions)

router.get("/", getProducts)
router.get("/:id", getoneProduct)
router.post("/", auth, upload.array("images", 5), validateProduct, createProduct)
router.put("/:id", auth, upload.array("images", 5), validateProduct, updateProduct)
router.delete("/:id", auth, deleteProduct)

module.exports = router