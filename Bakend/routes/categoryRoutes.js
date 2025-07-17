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
router.get('/subcategories',getAllsubCategories)
router.get('/:categoryId/subcategories',getSubCategories)
router.post('/subcategories',auth,validateSubCategory,creatSubCategory)

module.exports = router 