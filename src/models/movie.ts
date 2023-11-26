import { DataTypes } from 'sequelize';
import sequelize from '../repository/database';

//console.log('sequelize', sequelize);
const Movie = sequelize.define('movies', {
  movie_id: {
    // Sequelize module has INTEGER Data_Type.
    type: DataTypes.INTEGER,

    // To increment user_id automatically.
    autoIncrement: false,

    // user_id can not be null.
    allowNull: false,

    // For uniquely identify user.
    primaryKey: true,
  },
  movie_title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  genre: { type: DataTypes.STRING, allowNull: false },
});

export default Movie;
