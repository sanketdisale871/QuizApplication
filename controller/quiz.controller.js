import Quiz from "../model/Quiz.models.js";

const createquiz = async (req, res) => {
  const { title, description } = req.body;

  const quizcreation = await Quiz.create({
    title,
    description,
  });

  return res.status(200).json({
    message: "Quiz created",
    data: quizcreation,
  });
};

export { createquiz };
