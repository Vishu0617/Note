import express from "express";
import cors from "cors";
import "dotenv/config";
import AuthRoutes from "./src/routes/auth.route.js";
import NotesRoutes from "./src/routes/notes.routes.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.port || 9157;

app.use(express.json());
app.use(cors({ origin: process.env.webUrl, credentials: true }));
app.use(cookieParser({ origin: true }));

app.use("/auth", AuthRoutes);
app.use("/note", NotesRoutes);

app.use("*", (req, res) => {
  res.status(404).json({ status: 2, message: "URL not found." });
});

app.listen(PORT, () => {
  console.log(`~ Server run on port http://localhost:${PORT}`);
});
