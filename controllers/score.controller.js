const { Score } = require("../models/score.model");

async function getAllScore(req, res){
  try {
    const scoresData = await Score.find({}).populate({
      path: "user",
      model: "User",
      select: "username-_id",
    });
    res.status(200).json({ success: true, scoresData });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "error getting scores data" });
  }
};

async function addNewScore(req, res){
  try {
    const { scoreData } = req.body;
    const newScore = await Score.create(scoreData);
    const savedScore = await newScore.save();
    res.status(200).json({ success: true, savedScore });
  } catch (error) {
    res.status(400).json({ success: false, message: "error adding new score" });
  }
};

module.exports = { getAllScore, addNewScore }
