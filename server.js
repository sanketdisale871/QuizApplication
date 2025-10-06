import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from "./db/database.js";
import { createquiz } from "./controller/quiz.controller.js";
import { createquestion } from "./controller/quiestion.controller.js";
import { getAllQuestions } from "./controller/allQuestions.controller.js";
import { submitScore } from "./controller/subQuiz.controller.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8081;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
connectDB();

// Routes
app.get('/', (req, res) => res.send('Hello World!'));

app.post('/api/quiz', createquiz);
app.post('/api/:quiztitle/questions', createquestion);
app.get('/api/:quiztitle', getAllQuestions);
app.post('/api/:quiztitle/submit', submitScore);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});