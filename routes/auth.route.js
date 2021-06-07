const express = require("express")
const router = express.Router()

const { loginUser, signupUser, logoutUser, userIsLoggedIn, checkUsernameValidity } = require("../controllers/auth.controller")

const { isAuthenticated } = require("../middlewares/isAuthenticated.middleware")

router.post("/login",loginUser)

router.get("/isloggedin", isAuthenticated, userIsLoggedIn)

router.post("/username-check", checkUsernameValidity)

router.post("/signup", signupUser);

router.get("/logout", logoutUser);

module.exports = router