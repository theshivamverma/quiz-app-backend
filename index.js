const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
require("dotenv").config()
const app = express();

const PORT = process.env.PORT || 8000

const { initializeDBConnection } = require("./db/db.config")

initializeDBConnection();

app.use(bodyParser.json())
app.use(cors())

const userRouter  = require("./routes/user.route")
const scoreRouter  = require("./routes/score.route")
const authRouter  = require("./routes/auth.route")
const { errorHandler } = require("./middlewares/errorHandler.middleware");
const { routeNotFound } = require("./middlewares/routeNotFound.middleware");

app.use("/api/user", userRouter);
app.use("/api/score", scoreRouter);
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
    res.send("Hello world")
})

app.use(errorHandler);
app.use(routeNotFound);

app.listen(PORT, () => {
    console.log(`App is running on PORT ${PORT}`)
})