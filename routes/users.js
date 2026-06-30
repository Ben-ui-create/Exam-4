import {Router} from 'express';

import controller from '../controllers/users.js';
import schema from '../middlewares/schemas/users.schema.js';
import validation from '../middlewares/validation.js';

const router = new Router();

router.post(
  '/register',
  validation(schema.register, 'body'),
  controller.register,
);

router.post(
  '/login',
  validation(schema.login, 'body'),
  controller.login,
);

router.post(
 '/activate',
 validation(schema.activate, 'body'),
 controller.activate,
);

router.post(
  '/logout',
  controller.logout,
);

router.get(
  '/profile',
  controller.profile,
);

router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/login', (req, res) => {
  res.render('login');
});

export default router;