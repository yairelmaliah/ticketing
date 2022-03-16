import express from 'express';
import 'express-async-errors';
import cookieParser from 'cookie-parser';

import { NotFoundError, errorHandler, currentUser } from '@yair-tickets/common';
import { createTicketRouter } from './routes/new';
import { showTicketRouter } from './routes/show';
import { indexTicketRouter } from './routes';
import { updateTicketRouter } from './routes/update';

const app = express();

app.set('trust proxy', true);
app.use(express.json());
app.use(cookieParser());

app.use(currentUser);

app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

app.all('*', (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
