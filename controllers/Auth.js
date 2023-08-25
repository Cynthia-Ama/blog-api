const User = require("../models/Users")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

async function Register(req, res){
    try {
        let user = await User.findOne({username: req.body.username})
        if (user){
            res.status(400).json("User already exists. Please try a different username!")
        }
        else {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(req.body.password, salt)

            let newUser = new User ({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword 
            })

            const user = await newUser.save()
            res.status(200).json({user})
        }
    } 
    catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
}

async function Login(req, res){
    try {
        let user = await User.findOne({username: req.body.username})
        if(!user) return res.status(404).json("User not found")

        const validated = await bcrypt.compare(req.body.password, user.password)
        if (!validated) return res.status(400).json("Wrong credentials")

        const token = jwt.sign({id: user._id, user: user.username}, process.env.JWTKEY)

        const {username} = user._doc
        res.status(200).json({token, username})
    }
    catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

async function LogOut(req, res){
    try {
        res.status(200).json("user has been logged out")
    } 
    catch (error) {
        console.log(error)
    }
    
}

module.exports = {Register, Login, LogOut}