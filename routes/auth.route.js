const express = require("express")
const router = express.Router()

const { loginUser, signupUser, checkUsernameValidity } = require("../controllers/auth.controller")

router.post("/login",loginUser)

router.post("/username-check", checkUsernameValidity)

router.post("/signup", signupUser);

module.exports = router