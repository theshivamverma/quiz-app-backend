const { User } = require("../models/user.model");

async function getUserDataFromDB (req, res, next) {
   try {
     const id = req.userId
     const user = await User.findById(id).populate({
       path: "scoreboard",
       model: "Score",
     });
     if (!user) {
       res
         .status(400)
         .json({ success: false, message: "error getting user data" });
     }
     req.user = user;
     next();
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

module.exports = { getUserDataFromDB, getUserById, addScoreToUser }
