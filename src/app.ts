import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import fs from 'fs';
import path from 'path';
// import router from './routers/newsRouter';
// import authRouter from './routers/authRouter';
import showRouter from './routes/showRouter';

const app = express();

app.use(cors());
// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {
  flags: 'a',
});

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }));

app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// group('/news', (router: express.Router) => {

// });

app.use('/', showRouter);

export default app;
