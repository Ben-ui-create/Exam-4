import {Router} from 'express';

import usersRouter from './users.js';
import postsRouter from './posts.js';
import chatRouter from './chat.js';

const router = new Router();

router.use('/users', usersRouter);
router.use('/posts', postsRouter);
router.use('/api/chat', chatRouter);

export default router;