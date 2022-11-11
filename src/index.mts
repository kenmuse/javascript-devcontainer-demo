import express, { Request, Response } from 'express';
import { configureRoutes } from './routes/index.mjs';

const app = express();
const port = process.env.PORT ?? 80;

app.use('/', await configureRoutes());

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});
