import Joi from 'joi';

export default {
  create: Joi.object({
    caption: Joi.string().max(2000).required(),
  }),

  comment: Joi.object({
    text: Joi.string().min(1).max(1000).required(),
  }),

  message: Joi.object({
    to: Joi.number().required(),
    message: Joi.string().min(1).max(1000).required(),
    postId: Joi.number().required(),
  }),
}