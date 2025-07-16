// routes/authRoutes

const express = require("express")
const { register, login, getcurrentuser } = require("../controllers/authControllers")
const auth = require("../middleware/authMiddleware")
const { validateRegister, validateLogin } = require("../middleware/validation")

const router = express.Router()


router.post('/register',validateRegister,register)
router.post('/login',validateLogin,login)
router.get('/me',auth,getcurrentuser)

module.exports=router