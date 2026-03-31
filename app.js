import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import { env } from './config/env.js';

const app = express();

const corsOrigin =
  env.corsOrigin === '*'
    ? true
    : env.corsOrigin.split(',').map((origin) => origin.trim());

app.use(cors({ origin: corsOrigin }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/healthz', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/blog/v1/', routes.user);
app.use('/blog/v1/post', routes.post);
app.use('/blog/v1/category', routes.category);

const PORT = env.port;
app.listen(PORT, (err) => {
  if (err) throw err;
  else console.log(`The server is running at http://localhost:${PORT}`);
});
