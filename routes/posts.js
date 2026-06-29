import {Router} from 'express';

import controller from '../controllers/posts.js';

import validation from '../middlewares/validation.js';
import schema from '../middlewares/schemas/posts.schema.js';
import upload from '../middlewares/upload.js';

const router = new Router();

router.get(
  '/',
  controller.feed,
);

router.post(
  '/',
  upload.single('image'),
  validation(schema.create, 'body'),
  controller.create,
);

router.post(
  '/:id/like',
  controller.like,
);

router.post(
  '/:id/comment',
  validation(schema.comment, 'body'),
  controller.comment,
);

export default router;