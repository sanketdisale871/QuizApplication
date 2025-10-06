import Question from "../model/question.models.js";
import Quiz from "../model/Quiz.models.js";

const createquestion = async (req, res) => {
  const { quiztitle } = req.params;
  const { question, options } = req.body;

  const quiz = await Quiz.findOne({ title: quiztitle });

  if (!quiz) {
    return res.status(404).json({
      message: "Quiz not found",
    });
  }

  const questioncreation = await Question.create({
    quizId: quiz._id,
    question,
    options,
  });

  return res.status(200).json({
    message: "Question created",
    data: questioncreation,
  });
};

export { createquestion };
