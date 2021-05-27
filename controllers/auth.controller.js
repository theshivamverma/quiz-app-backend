const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model");

const SECRET = process.env.SECRET || "shhhhhh";

async function loginUser(req, res){
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    const isPasswordValid = await bcrypt.compare(password, user.password);

    user.password = undefined;

    if (isPasswordValid) {
      const token = jwt.sign(
        { userId: user._id, SECRET },
        { expiresIn: "24h" }
      );
      res
        .status(200)
        .json({ success: true, message: "Login successfull", user, token });
    } else {
      res.status(401).json({ success: false, message: "Unauthorized user" });
    }
  } catch (error) {
    res.status(401).json({ success: false, message: "Unauthorized user" });
  }
};

async function signupUser(req, res){
  try {
    const { user } = req.body;

    const newUser = await User.create(user);

    const salt = await bcrypt.genSalt(10);

    newUser.password = await bcrypt.hash(newUser.password, salt);

    const savedUser = await newUser.save();

    savedUser.password = undefined;

    res
      .status(200)
      .json({ success: true, savedUser, message: "Signup successfull" });
  } catch (error) {
    res
      .status(400)
      .json({
        success: false,
        message: "Error signing up user",
        errorMessage: error.message,
      });
  }
};

module.exports = { loginUser, signupUser }