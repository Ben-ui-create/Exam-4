import {DataTypes, Model} from 'sequelize';
import db from '../clients/db.sequelize.js';

import Users from './Users.js';

class Posts extends Model {

}

Posts.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },

    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    caption: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'posts',
    tableName: 'posts',
    timestamps: true,
  },
);

Users.hasMany(Posts, {
  foreignKey: 'userId',
  as: 'posts',
});

Posts.belongsTo(Users, {
  foreignKey: 'userId',
  as: 'posts',
});

export default Posts;