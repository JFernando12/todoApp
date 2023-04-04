import express from 'express';
import morgan from 'morgan';
import { currentUser } from './middlewares/current-user';
import { routerUser, routerTask } from './routes';

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));

app.use(currentUser);

// Routes
app.use('/users', routerUser);
app.use('/tasks', routerTask);

export { app };
