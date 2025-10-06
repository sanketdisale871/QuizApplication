import Question from "../model/question.models.js";
import Quiz from "../model/Quiz.models.js";

const submitScore = async (req, res) => {
  try {
    const { quiztitle } = req.params;
    const { answers } = req.body;

    // Find quiz
    const quiz = await Quiz.findOne({ title: quiztitle });
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    // Get all questions for the quiz
    const questions = await Question.find({ quizId: quiz._id });

    let score = 0;
    let total = questions.length;

    // Compare answers
    const results = questions.map((q) => {
      const userAnswer = answers.find(
        (a) => String(a.questionId) === String(q._id)
      );

      let isCorrect = false;
      if (userAnswer) {
        const selected = q.options.id(userAnswer.selectedOptionId);
        if (selected && selected.isCorrect) {
          score++;
          isCorrect = true;
        }
      }

      return {
        question: q.question,
        correctOptions: q.options.filter((opt) => opt.isCorrect),
        userSelected: userAnswer ? userAnswer.selectedOptionId : null,
        isCorrect,
      };
    });

    return res.status(200).json({
      message: "Quiz submitted",
      quiz: quiztitle,
      total,
      score,
      results,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error submitting quiz", error });
  }
};

export { submitScore };
