const mongoose = require("mongoose")
const { Schema } = mongoose

const UserSchema = new Schema({
    username: {
        type: String,
        required: "username is required"
    },
    password: {
        type: String,
        required: "password is mandatory"
    },
    scoreboard: [ { type: Schema.Types.ObjectId, ref: 'Score' } ],

}, { timestamps: true })

const User = mongoose.model("User", UserSchema)

module.exports = { User }