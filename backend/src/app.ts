import express, { Request, Response } from 'express';
import morgan from 'morgan';
import 'express-async-errors';
import { currentUser } from './middlewares/current-user';
import { routerUser, routerTask } from './routes';
import { errorHandler } from './middlewares';
import { NotFoundError } from './errors';

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));

app.use(currentUser);

// Routes
app.use('/users', routerUser);
app.use('/tasks', routerTask);
app.use('*', (req: Request, res: Response) => {
  throw new NotFoundError();
});
// Error handler
app.use(errorHandler);
export { app };
