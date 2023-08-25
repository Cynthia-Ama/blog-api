const express = require("express")
const {Register, Login, LogOut} = require("../controllers/Auth")

const router = express.Router()

router.post("/register", Register)
router.post("/login", Login)
router.post("/logout", LogOut)

module.exports = router 