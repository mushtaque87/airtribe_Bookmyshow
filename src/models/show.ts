import { DataTypes } from 'sequelize';
import sequelize from '../repository/database';

//console.log('sequelize', sequelize);
const Show = sequelize.define('shows', {
  show_id: {
    // Sequelize module has INTEGER Data_Type.
    type: DataTypes.INTEGER,

    // To increment user_id automatically.
    autoIncrement: false,

    // user_id can not be null.
    allowNull: false,

    // For uniquely identify user.
    primaryKey: true,
  },
  movie_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'movies',
      key: 'movie_id',
    },
  },
  theater_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'theaters',
      key: 'theater_id',
    },
  },
  show_time: { type: DataTypes.STRING, allowNull: false },
  date: { type: DataTypes.DATE, allowNull: false },
});

export default Show;
