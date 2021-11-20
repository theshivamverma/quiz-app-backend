const express = require("express");

const router = express.Router();

const  { getAllQuestions, createNewQuestion } = require("../controllers/question.controller")

router.route("/")
.get(getAllQuestions)
.post(createNewQuestion)

module.exports = router
