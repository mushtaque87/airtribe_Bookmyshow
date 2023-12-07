import express from 'express';
import {
  getShow,
  seedAllData,
  seedMovieData,
  seedShowData,
  seedTheaterData,
} from '../controllers/showController';
import { readCache, saveCache } from '../middlewares/cache';

const showRouter = express.Router();

// Routes to post data to database

showRouter.post('/seedAllData', seedAllData);
showRouter.post('/movies', seedMovieData);
showRouter.post('/theater', seedTheaterData);
showRouter.post('/shows', seedShowData);

// Routes to fetch data from database
showRouter.get('/shows', readCache, getShow, saveCache);

export default showRouter;
