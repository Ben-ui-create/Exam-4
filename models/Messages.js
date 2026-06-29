import {DataTypes, Model} from 'sequelize';
import db from '../clients/db.sequelize.js';

class Messages extends Model {

}

Messages.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },

    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    from: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },

    to: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'messages',
    tableName: 'messages',
    timestamps: true,
  }
);

export default Messages;