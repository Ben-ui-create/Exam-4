import Joi from 'joi';

export default {
  register: Joi.object({
    username: Joi.string().alphanum().required(),
    name: Joi.string().alphanum().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(32).required(),
  }),

  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(32).required(),
  }),

  activate: Joi.object({
    activationToken: Joi.number().min(100000).max(999999).required(),
  }),
}