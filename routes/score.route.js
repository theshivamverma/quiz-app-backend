const express = require("express")
const router = express.Router()

const { getAllScore, addNewScore } = require("../controllers/score.controller") 

const { isAuthenticated } = require("../middlewares/isAuthenticated.middleware")

router.route("/")
.get(getAllScore)
.post(isAuthenticated, addNewScore)

module.exports = router
