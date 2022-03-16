import express from 'express';
import 'express-async-errors';
import cookieParser from 'cookie-parser';
import { NotFoundError, errorHandler, currentUser } from '@yair-tickets/common';
import { createChargeRouter } from './routes/new';

const app = express();

app.set('trust proxy', true);
app.use(express.json());
app.use(cookieParser());

app.use(currentUser);

app.use(createChargeRouter);

app.all('*', (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
