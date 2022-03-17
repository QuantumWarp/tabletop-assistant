import 'express-async-errors';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import { connect } from 'mongoose';

import auth from './setup/auth';
import error from './setup/error';
import config from './setup/config';
import historyRouter from './history/history.router';
import noteRouter from './note/note.router';
import tabletopRouter from './tabletop/tabletop.router';

connect(config.dbConnection);

const app = express();

app.use(cors());
app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: true,
}));
app.use(auth);
app.use(bodyParser.json());

app.use('/tabletops', tabletopRouter);

app.use('/history', historyRouter);
app.use('/notes', noteRouter);

app.use(error);

app.listen(3001);
