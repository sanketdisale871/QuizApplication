import express from "express";
const router = express.Router();
import { createquiz } from "../controller/quiz.controller.js";
import { createquestion } from "../controller/quiestion.controller.js";
import { getAllQuestions } from "../controller/allQuestions.controller.js";
import { submitScore } from "../controller/subQuiz.controller.js";

router.get("/", (req, res) => res.send("Hello World!"));

router.post("/api/quiz", createquiz);
router.post("/api/:quiztitle/questions", createquestion);
router.get("/api/:quiztitle", getAllQuestions);
router.post("/api/:quiztitle/submit", submitScore);

export const generalRoutes = router;
