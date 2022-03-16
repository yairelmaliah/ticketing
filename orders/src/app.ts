import express from 'express';
import 'express-async-errors';
import cookieParser from 'cookie-parser';

import { NotFoundError, errorHandler, currentUser } from '@yair-tickets/common';

import { newOrderRouter } from './routes/new';
import { showOrderRouter } from './routes/show';
import { indexOrderRouter } from './routes';
import { deleteOrderRouter } from './routes/delete';

const app = express();

app.set('trust proxy', true);
app.use(express.json());
app.use(cookieParser());

app.use(currentUser);

app.use(deleteOrderRouter);
app.use(indexOrderRouter);
app.use(newOrderRouter);
app.use(showOrderRouter);

app.all('*', (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
