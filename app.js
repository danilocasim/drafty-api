import express from "express";
import cors from "cors";
import routes from "./routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/blog/v1/", routes.user);
app.use("/blog/v1/post", routes.post);
app.use("/blog/v1/category", routes.category);

const PORT = 8000;
app.listen(PORT, (err) => {
  if (err) throw err;
  else console.log(`The server is running at http://localhost:${PORT}`);
});
