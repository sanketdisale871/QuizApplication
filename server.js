import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db/database.js";
import { generalRoutes } from "./routes/route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8081;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
connectDB();

app.use("/", generalRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
