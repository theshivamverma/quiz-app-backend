const mongoose = require("mongoose")
const { Schema } = mongoose

const ScoreSchema = new Schema({
    quizname: {
        type: String,
        required: "quiz name is required"
    },
    score: {
        type: Number,
        required: "score is required"
    },
    outofscore : {
        type: Number,
        required: "out of score is required"
    },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
})

const Score = mongoose.model("Score", ScoreSchema)

module.exports = { Score }