//controllerse/authControllers

const User = require('../models/User')
const jwt = require('jsonwebtoken')

// for generate the token
const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT, { expiresIn: "7d" })
}

// for registor the user
const register = async (req, res) => {
    try {
        console.log("started register");
        
        const { name, email, password } = req.body
        const existUser = await User.findOne({ email })
        if (existUser) {
            return res.status(400).json({ message: 'user is already existed' })
        }
        const newUser = new User({ name, email, password })
        await newUser.save()

        const token = generateToken(newUser._id)

        res.status(201).json({
            message: " user registered successfully",
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        })
    } catch (error) {
        res.status(500).json({ message: "server error" })
    }
}

// for login the user
const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const existUser = await User.findOne({ email })
        if (!existUser) {
            return res.status(400).json({ message: "user is not registered " })
        }
        const isMatch = await existUser.comparePassword(password)
        if (!isMatch) {
            return res.status(400).json({ message: "The password is incorrect" })
        }
        const Token = generateToken(existUser._id)

        res.json({
            message: "user is loggedin",
            Token,
            user: {
                id: existUser._id,
                name: existUser.name,
                email: existUser.email
            }

        })
    } catch (error) {
        console.error("Login Error:", error)
        res.status(500).json({ message: 'server error' })
    }

}

// for get the current user
const getcurrentuser = async (req, res) => {
    try {
        res.json({
            user: {
                id: req.user._id,
                name: req.user.name,
                email: req.user.email,
            },
        })

    } catch (error) {
        res.status(500).json({ message: "server error" })
    }
}


module.exports = { register, login, getcurrentuser }