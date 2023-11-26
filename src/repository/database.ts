import { Sequelize } from 'sequelize';
//import Movie from '../models/movie';
//import sequelize from '../../index';

const sequelize = new Sequelize('bookmyshow', 'root', '', {
  host: '127.0.0.1',
  dialect: 'mysql',
  logging: false,
});

export const connectDatabase = async () => {
  sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');

      const Movie = require('../models/movie').default;
      const Theater = require('../models/theater').default;
      const Show = require('../models/show').default;

      // Define the association
      Movie.hasMany(Show, { foreignKey: 'movie_id' });
      Show.belongsTo(Movie, { foreignKey: 'movie_id' });

      Theater.hasMany(Show, { foreignKey: 'theater_id' });
      Show.belongsTo(Theater, { foreignKey: 'theater_id' });

      sequelize.sync();

      // (async () => {
      //   await sequelize.sync({ force: true });
      //   // Code here

      //   //Movie.sync({ force: true }).then(() => {
      // const movie = Movie.build({
      //   movie_id: 1,
      //   movie_title: 'Jawan',
      //   genre: 'Action',
      // });
      // movie.save();
      //   //});
      // })();

      // sequelize.sync({ force: true });
    })
    .catch((error: any) => {
      console.error('Unable to connect to the database: ', error);
    });
};

export default sequelize;
