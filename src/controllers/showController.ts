import { PrismaClient } from '@prisma/client';
import log from '../utils/logs';
import { NextFunction, Request, Response } from 'express';
import Movie from '../models/movie';
import Show from '../models/show';
import Theater from '../models/theater';

import { readCache, saveCache } from '../middlewares/cache';

const prisma = new PrismaClient();

export const seedAllData = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const movies = [
    { movie_id: 1, movie_title: 'Jawan', genre: 'Action' },
    { movie_id: 2, movie_title: 'OPPENHEIMER', genre: 'Drama' },
    { movie_id: 3, movie_title: 'Evil Dead', genre: 'Horror' },
  ];

  Movie.bulkCreate(movies)
    .then((data: any) => {
      log.info('save movie', data);
    })
    .catch((err: any) => {
      return res.status(500).send({ message: err });
    });

  const theaters = [
    { theater_id: 1, theater_name: 'Cinepolis Mall A', city: 'HYD' },
    { theater_id: 2, theater_name: 'Cinepolis Mall B', city: 'HYD' },
    { theater_id: 3, theater_name: 'Cinepolis Towli Chowki', city: 'HYD' },
    { theater_id: 4, theater_name: 'INOX', city: 'HYD' },
    { theater_id: 5, theater_name: 'PVR', city: 'BLR' },
    { theater_id: 6, theater_name: 'PVR', city: 'BLR' },
    { theater_id: 7, theater_name: 'IMAX', city: 'BLR' },
  ];

  Theater.bulkCreate(theaters)
    .then((data: any) => {
      log.info('save theater', data);
    })
    .catch((err: any) => {
      return res.status(500).send({ message: err });
    });

  const shows = [
    {
      show_id: 1,
      show_time: '10:00 AM',
      movie_id: 1,
      theater_id: 1,
      date: '2021-12-01',
    },
    {
      show_id: 2,
      show_time: '09:00 AM',
      movie_id: 1,
      theater_id: 1,
      date: '2021-12-01',
    },
    {
      show_id: 3,
      show_time: '10:00 PM',
      movie_id: 1,
      theater_id: 2,
      date: '2021-12-01',
    },
    {
      show_id: 4,
      show_time: '08:00 PM',
      movie_id: 1,
      theater_id: 3,
      date: '2021-11-27',
    },
    {
      show_id: 5,
      show_time: '11:00 AM',
      movie_id: 2,
      theater_id: 4,
      date: '2021-11-27',
    },
    {
      show_id: 6,
      show_time: '12:00 PM',
      movie_id: 3,
      theater_id: 5,
      date: '2021-11-29',
    },
    {
      show_id: 7,
      show_time: '06:00 PM',
      movie_id: 3,
      theater_id: 6,
      date: '2021-11-30',
    },
    {
      show_id: 8,
      show_time: '06:00 PM',
      movie_id: 3,
      theater_id: 6,
      date: '2021-11-26',
    },
    {
      show_id: 9,
      show_time: '06:00 PM',
      movie_id: 3,
      theater_id: 7,
      date: '2021-11-29',
    },
    {
      show_id: 10,
      show_time: '06:00 PM',
      movie_id: 3,
      theater_id: 7,
      date: '2021-11-29',
    },
  ];

  Show.bulkCreate(shows)
    .then((data: any) => {
      log.info('save show', data);
    })
    .catch((err: any) => {
      return res.status(500).send({ message: err });
    });
};

export const seedMovieData = async (
  req: Request,
  res: Response,
): Promise<void> => {
  log.info('seedData', req.body);
  const movie = Movie.build({
    movie_id: req.body.movie_id,
    movie_title: req.body.movie_title,
    genre: req.body.genre,
  });
  movie
    .save()
    .then((data: any) => {
      log.info('save', data);
      return res
        .status(200)
        .send({ message: `Movie saved successfully ${movie}` });
    })
    .catch((err: any) => {
      return res.status(500).send({ message: err });
    });
};
export const seedTheaterData = async (
  req: Request,
  res: Response,
): Promise<void> => {
  log.info('seedTheaterData', req.body);
  const theater = Theater.build({
    theater_id: req.body.theater_id,
    theater_name: req.body.theater_name,
    city: req.body.city,
  });
  theater
    .save()
    .then((data: any) => {
      log.info('save', data);
      return res
        .status(200)
        .send({ message: `Movie saved successfully ${theater}` });
    })
    .catch((err: any) => {
      return res.status(500).send({ message: err });
    });
};
export const seedShowData = async (
  req: Request,
  res: Response,
): Promise<void> => {
  log.info('seedData', req.body);
  const show = Show.build({
    show_id: req.body.show_id,
    show_time: req.body.show_time,
    movie_id: req.body.movie_id,
    theater_id: req.body.theater_id,
    date: req.body.date,
  });
  show
    .save()
    .then((data: any) => {
      log.info('save', data);
      return res
        .status(200)
        .send({ message: `Movie saved successfully ${show}` });
    })
    .catch((err: any) => {
      return res.status(500).send({ message: err });
    });
};
export const getShow = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  log.info('getShow', req.body, req.query, req.params);
  // readCache(req, res).then((data: any) => {

  // });

  if (res.statusCode === 200) {
    return log.info('Cache hit');
  }

  Show.findAll({
    attributes: ['show_time'],
    where: {
      date: req.query.date,
    },
    include: [
      {
        model: Movie,
        attributes: ['movie_title'],
        required: true,
      },
      {
        model: Theater,
        attributes: ['theater_name'],
        required: true,
        where: {
          city: req.query.city,
          theater_id: req.query.theater_id,
        },
      },
    ],
  })
    .then(shows => {
      const response: any = [];
      shows.forEach(show => {
        console.log(show.dataValues);
        response.push({
          show_time: show.dataValues.show_time,
          movie_title: show.dataValues.movie.dataValues.movie_title,
          theater_name: show.dataValues.theater.dataValues.theater_name,
        });
      });
      console.log('Response -> ', response);
      res.locals.data = response;
      //return res.status(200).send(response);
      next();
    })
    .catch(error => console.log('This error occured', error));
};
