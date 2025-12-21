import express from "express";
import cors from "cors";
import routes from "./routes/index.js";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/", routes.userRouter);
app.use("/article", routes.articleRouter);

const PORT = 8000;
app.listen(PORT, (err) => {
  if (err) throw err;
  else console.log(`The server is running at http://localhost:${PORT}`);
});
