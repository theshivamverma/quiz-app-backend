const { Question } = require("../models/queston.model");

async function getAllQuestions(req, res){
  try {
    const questions = await Question.find({});
    res.status(200).json({ success: true, questions });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "error getting questions data" });
  }
};

async function createNewQuestion(req, res){
  try {
    const { question } = req.body;
    const newQuestion = await Question.create(question);
    const savedQuestion = await newQuestion.save();
    res.status(200).json({ success: true, savedQuestion });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { getAllQuestions, createNewQuestion }