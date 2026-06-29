import {DataTypes, Model} from 'sequelize';
import md5 from 'md5';
import db from '../clients/db.sequelize.js';

const {PASSWORD_SECRET} = process.env;

class Users extends Model {
  static hashPassword(password) {
    return md5(md5(password) + PASSWORD_SECRET);
  }
}

Users.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },

    username: {
      type: DataTypes.STRING,
    },

    name: {
      type: DataTypes.STRING,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue('password', Users.hashPassword(value));
      }
    },

    avatar: {
      type: DataTypes.STRING,
    },

    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending'
    },

    activationToken: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db,
    modelName: 'users',
    tableName: 'users',
    timestamps: true,
  },
);

export default Users;