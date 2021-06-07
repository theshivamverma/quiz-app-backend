const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model");
require("dotenv").config();

const SECRET = process.env.SECRET || "shhhhhh";

async function loginUser(req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordValid = await bcrypt.compare(password, user.password);

    user.password = undefined;

    if (isPasswordValid) {
      const token = jwt.sign({ userId: user._id }, SECRET, {
        expiresIn: "24h",
      });
      res.cookie("token", token, {
        expires: new Date(Date.now() + 999999999),
        httpOnly: true,
      });
      res
        .status(200)
        .json({ success: true, message: "Login successfull", user });
    } else {
      res
        .status(401)
        .json({
          success: false,
          message: "Unauthorized",
          errorMessage: error.message,
        });
    }
  } catch (error) {
    res
      .status(401)
      .json({
        success: false,
        message: "Unauthorized user",
        errorMessage: error.message,
      });
  }
}

async function signupUser(req, res) {
  try {
    const { user } = req.body;
    const newUser = await User.create(user);
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    const savedUser = await newUser.save();
    savedUser.password = undefined;

    const token = jwt.sign({ userId: savedUser._id }, SECRET, { expiresIn: "24h" });
    res.cookie("token", token, {
      expires: new Date(Date.now() + 999999999),
      httpOnly: true,
    });

    res
      .status(200)
      .json({ success: true, savedUser, message: "Signup successfull" });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error signing up user",
      errorMessage: error.message,
    });
  }
}

function logoutUser(req, res) {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logout successful" });
}

function userIsLoggedIn(req, res) {
  res.status(200).json({ success: false, message: "Authorized user" });
}

async function checkUsernameValidity(req, res) {
  try {
    const { username } = req.body;
    const user = await User.find({ username });
    if (user.length > 0) {
      res.status(200).json({ success: false, message: "Username exists" });
    } else {
      res.status(200).json({ success: true, message: "Username avaialable" });
    }
  } catch (error) {
    res.status(400).json({ success: false, errorMessage: error.message });
  }
}

module.exports = {
  loginUser,
  signupUser,
  logoutUser,
  userIsLoggedIn,
  checkUsernameValidity,
};
