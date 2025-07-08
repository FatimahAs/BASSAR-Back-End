import { Router } from 'express';
import * as UserController from '../controllers/user.controller';
import { protectRoute } from '../middleware/auth.middleware';

const router = Router();



router.post('/register',UserController.registerUser);


router.post('/login', UserController.loginUser);

router.post('/logOut', UserController.logOut);


router.get('/helpers', UserController.getHelpers);


router.post('/rate/:helperId', protectRoute, UserController.rateHelper);

export default router;
