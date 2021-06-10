const express = require("express")
const router = express.Router()

const { loginUser, signupUser, logoutUser, checkUsernameValidity } = require("../controllers/auth.controller")

router.post("/login",loginUser)

router.post("/username-check", checkUsernameValidity)

router.post("/signup", signupUser);

router.get("/logout", logoutUser);

module.exports = router