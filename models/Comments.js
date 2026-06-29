import {DataTypes, Model} from 'sequelize';
import db from '../clients/db.sequelize.js';
import sequelize from "../clients/db.sequelize.js";

class Comments extends Model {

}

Comments.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },

    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'comments',
    tableName: 'comments',
    timestamps: true,
  },
);

export default Comments;