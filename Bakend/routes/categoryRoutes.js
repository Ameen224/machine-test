// routes/categoryRoutes

const express = require('express')
const{getSubCategories,
    getAllsubCategories,
    creatSubCategory,
    createCategory,
    getAllCategory }=require("../controllers/categoryController")
const auth=require('../middleware/authMiddleware')    
const {validateCategory,validateSubCategory}=require('../middleware/validation')

const router = express.Router()

router.get('/',getAllCategory)
router.post('/',auth,validateCategory,createCategory)
router.get('/subcategories',getSubCategories)
router.get('/:categoryId/subcategories',getAllsubCategories)
router.post('/subcategories',auth,validateSubCategory,creatSubCategory)

module.exports = router 