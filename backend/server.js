import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToMongoDB from "./db/ConnectToMongoDB.js";
import authRoutes from "./routes/auth.routes.js"
import loanRoutes from "./routes/loan.routes.js"
import cookieParser from "cookie-parser"

const app = express();
const PORT = process.env.PORT || 8000; 

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/loans", loanRoutes);

app.get("/", (req, res) => {
  res.send(`<h1>Welcome to Mini-Loan App</h1>`);
});

app.listen(PORT, () => {
   connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
});
