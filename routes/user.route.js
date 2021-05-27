const express = require("express");

const router = express.Router();

const {
  getAllUsernames,
  getUserFromParam,
  getUserById,
  addScoreToUser,
} = require("../controllers/user.controller");

const { isAuthenticated } = require("../middlewares/isAuthenticated.middleware");

router.route("/").get(getAllUsernames);

router.use(isAuthenticated)

router.param("userId", getUserFromParam);

router.route("/:userId").get(getUserById);

router.route("/:userId/add-new-score").post(addScoreToUser);

module.exports = router;
