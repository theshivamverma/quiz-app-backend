const { User } = require("../models/user.model");

async function getAllUsernames(req, res) {
  try {
    const UsersData = await User.find({}).select("username -_id");
    res.status(200).json({ success: true, UsersData });
  } catch (error) {
    res.status(400).json({
      success: false,
      errorMessage: error.message,
      message: "Error fetching users data",
    });
  }
}

async function getUserFromParam (req, res, next, id) {
   try {
     const user = await User.findById(id).populate({
       path: "scoreboard",
       model: "Score",
     });
     if (!User) {
       res
         .status(400)
         .json({ success: false, message: "error getting user data" });
     }
     (req.user = user), next();
   } catch (error) {
     res
       .status(400)
       .json({
         success: false,
         message: "error getting user data",
         errorMessage: error.message,
       });
   }
 };

 function getUserById (req, res){
    const { user } = req
    user.password = undefined
    user._v = undefined
    res.status(200).json({ success: true, user })
}

async function addScoreToUser(req, res){
  try {
    const { scoreId } = req.body;
    const { user } = req;
    user.scoreboard.push(scoreId);
    const savedUser = await user.save();
    res.status(200).json({ success: true, savedUser });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "error adding score to user" });
  }
};

module.exports = { getAllUsernames, getUserFromParam, getUserById, addScoreToUser }
