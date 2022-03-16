import express from 'express';
import 'express-async-errors';
import cookieParser from 'cookie-parser';

import { NotFoundError, errorHandler } from '@yair-tickets/common';
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';

const app = express();

app.set('trust proxy', true);
app.use(express.json());
app.use(cookieParser());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
