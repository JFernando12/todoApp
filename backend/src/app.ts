import express from 'express';
import morgan from 'morgan';
import { currentUser } from './middlewares/ current-user';
import {
  routerSignup,
  routerSignin,
  routerAddTask,
  routerDeleteTask,
  routerGetTask,
  routerGetTasks,
  routerUpdateTask,
} from './routes';

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));

app.use(currentUser);

// Routes
app.use(routerSignup);
app.use(routerSignin);
app.use(routerAddTask);
app.use(routerDeleteTask);
app.use(routerGetTask);
app.use(routerGetTasks);
app.use(routerUpdateTask);

export { app };
