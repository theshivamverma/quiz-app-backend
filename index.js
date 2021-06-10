const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();

const userRouter = require("./routes/user.route");
const scoreRouter = require("./routes/score.route");
const authRouter = require("./routes/auth.route");
const questionRouter = require("./routes/question.route");
const { errorHandler } = require("./middlewares/errorHandler.middleware");
const { routeNotFound } = require("./middlewares/routeNotFound.middleware");

const PORT = process.env.PORT || 8000;

const { initializeDBConnection } = require("./db/db.config");

initializeDBConnection();

app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

app.set("trust proxy", 1);

app.use("/api/user", userRouter);
app.use("/api/score", scoreRouter);
app.use("/api/auth", authRouter);
app.use("/api/question", questionRouter);

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use(errorHandler);
app.use(routeNotFound);

app.listen(PORT, () => {
  console.log(`App is running on PORT ${PORT}`);
});
