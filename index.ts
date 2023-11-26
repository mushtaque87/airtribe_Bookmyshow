import express from 'express';
//import { PrismaClient } from '@prisma/client';
import app from './src/app';
import dotenv from 'dotenv';
import log from './src/utils/logs';
dotenv.config();
import { DataTypes, Sequelize } from 'sequelize';
import Movie from './src/models/movie';
import sequelize, { connectDatabase } from './src/repository/database';
const PORT = process.env.PORT || 4000;

//const prisma = new PrismaClient();

//const Sequelize = require('sequelize');

// const sequelize = new Sequelize('bookmyshow', 'root', '', {
//   host: '127.0.0.1',
//   dialect: 'mysql',
// });

// const sequelize = new Sequelize('bookmyshow', 'root', '', {
//   host: '127.0.0.1',
//   dialect: 'mysql',
//   logging: false,
// });

// main()
//   .catch(e => {
//     throw e;
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

// const Movie = sequelize.define('Movie', {
//   title: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   releaseYear: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
// });

app.listen(PORT, async () => {
  log.info(`🚀 Server ready at http://localhost:${PORT}`);
  await connectDatabase();

  // const Movie = sequelize.define('Movie', {
  //   title: {
  //     type: DataTypes.STRING,
  //     allowNull: false,
  //   },
  //   releaseYear: {
  //     type: DataTypes.INTEGER,
  //     allowNull: false,
  //   },
  // });

  // const Movie = sequelize.define('movies', {
  //   movie_id: {
  //     // Sequelize module has INTEGER Data_Type.
  //     type: DataTypes.INTEGER,

  //     // To increment user_id automatically.
  //     autoIncrement: false,

  //     // user_id can not be null.
  //     allowNull: false,

  //     // For uniquely identify user.
  //     primaryKey: true,
  //   },
  //   movie_title: {
  //     type: DataTypes.STRING,
  //     allowNull: false,
  //   },
  //   genre: { type: DataTypes.STRING, allowNull: false },
  // });
});
