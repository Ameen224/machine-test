// routers/wishlistRouter

const express=require('express')
const router=express.Router()

router.get("/")
router.post('/add')
router.delete('/remove/:producId')

module.exports=router