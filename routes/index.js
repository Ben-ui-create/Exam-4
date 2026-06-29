import {Router} from 'express';

import usersRouter from './users.js';

const router = new Router();

router.use('/users', usersRouter);

export default router;