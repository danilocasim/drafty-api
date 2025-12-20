import express from "express";
import cors from "cors";
import userRouter from "./routes/user.js";
import articleRouter from "./routes/article.js";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/", userRouter);
app.use("/article", articleRouter);

const PORT = 8000;
app.listen(PORT, (err) => {
  if (err) throw err;
  else console.log(`The server is running at http://localhost:${PORT}`);
});
