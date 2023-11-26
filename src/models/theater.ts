import { DataTypes } from 'sequelize';
import sequelize from '../repository/database';

//console.log('sequelize', sequelize);
const Theater = sequelize.define('theaters', {
  theater_id: {
    // Sequelize module has INTEGER Data_Type.
    type: DataTypes.INTEGER,

    // To increment user_id automatically.
    autoIncrement: false,

    // user_id can not be null.
    allowNull: false,

    // For uniquely identify user.
    primaryKey: true,
  },
  theater_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: { type: DataTypes.STRING, allowNull: false },
});

export default Theater;
