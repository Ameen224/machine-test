// server.js

const express = require('express')
const dotenv = require('dotenv')
const connectDB = require("./config/db")
const cors = require('cors')
dotenv.config()

const authRoutes = require("./routes/authRoutes")
const categoryRoutes = require("./routes/categoryRoutes")
const productRoutes = require("./routes/productRoutes")
const wishlistRoutes = require("./routes/wishlistRoutes")

const app = express()


app.use(cors())
app.use(express.json())
connectDB()


app.use('/api/auth', authRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/products', productRoutes)
app.use('/api/wishlist', wishlistRoutes)

app.get("/", (req, res) => {
    res.json({ message: "your bakend is working" })
    console.log("working")
})

const port = process.env.Port
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);

})
