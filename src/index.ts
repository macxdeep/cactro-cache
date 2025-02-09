import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import cacheRouter from './routes/cache.route';
import {apiKeyMiddleware} from './middlewares/apiKey.middleware';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Cactro Cache API');
});

// ROUTES
app.use('/cache', apiKeyMiddleware, cacheRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
