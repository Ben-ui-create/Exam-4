import {DataTypes, Model} from 'sequelize';
import db from '../clients/db.sequelize.js';

class Likes extends Model {

}

Likes.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    sequelize: db,
    modelName: 'likes',
    tableName: 'likes',
    timestamps: true,
  },
);

export default Likes;