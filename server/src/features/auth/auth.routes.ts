import { Router } from 'express';
import { loginValidator, registerValidator } from './auth.validation';
import { validate } from '../../shared/middlewares/validate';
import {
  registerController,
  loginController,
  refreshController,
  logoutController,
} from './auth.controller';

const router = Router();

// Rate limiting disabled for now
// const authLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 10,
//   message: {
//     success: false,
//     message: 'Too many login attempts, please try again after 15 minutes',
//   },
//   standardHeaders: true,
//   legacyHeaders: false,
// });

router.post('/register', registerValidator, validate, registerController);
router.post('/login', loginValidator, validate, loginController);
router.post('/refresh', refreshController);
router.post('/logout', logoutController);

export default router;
