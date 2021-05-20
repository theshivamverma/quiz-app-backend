const express = require("express")
const { User } = require("../models/user.model")

const router = express.Router()

router.route("/")
.get(async (req, res) => {
    try {
        const UsersData = await User.find({}).select("username -_id")
        res.status(200).json({ success: true, UsersData })
    } catch (error) {
        res.status(400).json({ success: false, errorMessage: error.message, message: "Error fetching users data" })
    }
})
.post(async (req, res) => {
    try {
        const { user } = req.body;
        const newUser = await User.create(user)
        const savedUser = await newUser.save()
        savedUser.password = undefined;
        res.status(200).json({ success: true, savedUser })
    } catch (error) {
        res.status(400).json({ success: false, message: "Error creating user" })
    }
})

router.param("userId", async (req, res, next, id) => {
    try {
        const User = await User.findById(id).populate({
            path: "scoreboard",
            model: "Score"
        })
        if(!User){
            res.status(400).json({ success: false, message: "error getting user data" })
        }
        req.user = User,
        next()
    } catch (error) {
        res.status(400).json({ success: false, message: "error getting user data", errorMessage: error.message })
    }
})

router.route("/:userId")
.get((req, res) => {
    const { user } = req
    user.password = undefined
    user._v = undefined
    res.status(200).json({ success: true, user })
})

router.route("/:userId/add-new-score")
.post(async (req, res) => {
    try {
        const { scoreId } = req.body
        const { user } = req
        user.scoreboard.push(scoreId)
        const savedUser = await user.save()
        res.status(200).json({ success: true, savedUser })
    } catch (error) {
        res.status(400).json({ success: false, message: "error adding score to user" })
    }
})

module.exports = router