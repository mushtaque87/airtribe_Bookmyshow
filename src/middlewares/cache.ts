import { Request, Response, NextFunction } from 'express';
import log from '../utils/logs';
import * as redis from 'redis';
import { createClient } from 'redis';

const redisClient = createClient()
  .on('error', err => console.log('Redis Client Error', err))
  .connect();

export const readCache = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  log.info('readCache', req.query);
  const key = `city=${req.query.city}&theater_id=${req.query.theater_id}&date=${req.query.date}`;

  const data: any = await (await redisClient).get(key);
  log.info('readCache value', data);
  const shows = JSON.parse(data);

  if (data !== null && shows.length > 0) {
    log.info('readCache', data);
    console.log('Response -> ', shows);
    return res.status(200).send(shows);
  } else {
    res.status(404);
    next();
  }
};

export const saveCache = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  log.info('saveCache', req.query);
  const key = `city=${req.query.city}&theater_id=${req.query.theater_id}&date=${req.query.date}`;
  const value = res.locals.data;
  (await redisClient).setEx(key, 3600, JSON.stringify(value));
  res.status(200).send(value);
  next();
};
