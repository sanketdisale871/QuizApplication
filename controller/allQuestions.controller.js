import Question from "../model/question.models.js";
import Quiz from "../model/Quiz.models.js";

const getAllQuestions = async (req, res) => {
  const { quiztitle } = req.params;
  const quiz = await Quiz.findOne({ title: quiztitle });

  if (!quiz) {
    return res.status(404).json({
      message: "Quiz not found",
    });
  }

  const questions = await Question.find({ quizId: quiz._id }).select(
    "-isCorrect"
  );

  return res.status(200).json({
    message: "All Questions",
    data: questions,
  });
};

export { getAllQuestions };
