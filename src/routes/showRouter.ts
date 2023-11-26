import express from 'express';
import {
  getShow,
  seedAllData,
  seedMovieData,
  seedShowData,
  seedTheaterData,
} from '../controllers/showController';

const showRouter = express.Router();

// Routes to post data to database

showRouter.post('/seedAllData', seedAllData);
showRouter.post('/movies', seedMovieData);
showRouter.post('/theater', seedTheaterData);
showRouter.post('/show', seedShowData);

// Routes to fetch data from database
showRouter.get('/show', getShow);

export default showRouter;
