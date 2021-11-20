const mongoose = require("mongoose")

const { Schema } = mongoose

const QuestionSchema = new Schema({
    question: String,
    options: {
        option_a: String,
        option_b: String,
        option_c: String,
        option_d: String,
    },
    correct_answer: String,
    point: Number,
    negativePoint: Number,
    category: String,
    difficulty: String
})

const Question = mongoose.model("Question", QuestionSchema)

module.exports = { Question }