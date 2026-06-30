import HttpErrors from 'http-errors';
import {Op} from 'sequelize';

import {Messages, Users} from '../models/index.js';
import Socket from '../services/Socket.js';

export default {
  async sendMessage(req, res, next) {
    try {
      const {to, message} = req.body;

      const user = await Users.findByPk(to);

      if (!user) {
        throw new HttpErrors(404, {
          errors: {
            message: 'User not found',
          },
        });
      }

      const messageData = await Messages.create({
        from: req.session.user.id,
        to,
        message,
      });

      Socket.emit(`user_${to}`, messageData);

      res.status(200).json({
        status: 'ok',
      });
    } catch (e) {
      next(e);
    }
  },

  async getMessages(req, res, next) {
    try {
      const {fromId} = req.params;

      const messages = await Messages.findAll({
        where: {
          [Op.or]: [
            {
              from: req.session.user.id,
              to: fromId,
            },

            {
              from: fromId,
              to: req.session.user.id,
            },
          ],
        },
        order: [['createdAt', 'DESC']],
      });

      res.status(200).json(messages);
    } catch (e) {
      next(e);
    }
  }
}