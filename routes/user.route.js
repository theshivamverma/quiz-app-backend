const express = require("express");

const router = express.Router();

const {
  getUserDataFromDB,
  getUserById,
  addScoreToUser,
} = require("../controllers/user.controller");

const { isAuthenticated } = require("../middlewares/isAuthenticated.middleware");

router.use(isAuthenticated);

router.get("/userdetail", getUserDataFromDB, getUserById);

router.post("/add-new-score", getUserDataFromDB, addScoreToUser);

module.exports = router;