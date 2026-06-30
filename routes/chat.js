import {Router} from 'express';

import controller from '../controllers/chat.js';

import validation from '../middlewares/validation.js';
import schema from '../middlewares/schemas/posts.schema.js';

const router = new Router();

router.post(
  '/send/message',
  validation(schema.message, 'body'),
  controller.sendMessage,
);

router.post(
  '/messages/:fromId',
  controller.getMessages,
);

export default router;