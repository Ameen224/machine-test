// middleware/validation



// validation for registor
const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please provide name, email, and password" })
  }

  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters long" })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Please provide a valid email address" })
  }

  next()
}


// validation for login
const validateLogin = (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: "Please provide email and password" })
  }

  next()
}


// validation for adding the category
const validateCategory = (req, res, next) => {
  const { name } = req.body

  if (!name || name.trim().length === 0) {
    return res.status(400).json({ message: "Category name is required" })
  }

  next()
}

// // validation for subcategory
const validateSubCategory = (req, res, next) => {
  const { name, categoryId } = req.body

  if (!name || name.trim().length === 0) {
    return res.status(400).json({ message: "Sub-category name is required" })
  }

  if (!categoryId) {
    return res.status(400).json({ message: "Category ID is required" })
  }

  next()
}

// validation for product 
const validateProduct = (req, res, next) => {
  const { name, description, category, subCategory, variants } = req.body

  if (!name || name.trim().length === 0) {
    return res.status(400).json({ message: "Product name is required" })
  }

  if (!description || description.trim().length === 0) {
    return res.status(400).json({ message: "Product description is required" })
  }

  if (!category) {
    return res.status(400).json({ message: "Category is required" })
  }

  if (!subCategory) {
    return res.status(400).json({ message: "Sub-category is required" })
  }

  if (!variants || !Array.isArray(variants) || variants.length === 0) {
    return res.status(400).json({ message: "At least one product variant is required" })
  }

  // Validate each variant
  for (let i = 0; i < variants.length; i++) {
    const variant = variants[i]
    if (!variant.ram || !variant.price || variant.quantity === undefined) {
      return res.status(400).json({
        message: `Variant ${i + 1}: RAM, price, and quantity are required`,
      })
    }

    if (variant.price < 0) {
      return res.status(400).json({
        message: `Variant ${i + 1}: Price cannot be negative`,
      })
    }

    if (variant.quantity < 0) {
      return res.status(400).json({
        message: `Variant ${i + 1}: Quantity cannot be negative`,
      })
    }
  }

  next()
}

module.exports = {
  validateRegister,
  validateLogin,
  validateCategory,
  validateSubCategory,
  validateProduct,
}
