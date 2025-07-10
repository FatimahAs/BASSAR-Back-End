import express from 'express';
import {
  registerUser,
  registerHelper,
  updateUser,
  deleteUser,
  getNearbyHelpers,
} from '../controllers/user.controller';
import { loginUser } from '../controllers/auth.controller';
import { protectRoute } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/register-user', registerUser);
router.post('/register-helper', registerHelper);
router.post('/login', loginUser);
router.get('/helpers/nearby', protectRoute, getNearbyHelpers);

//auth
router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);

export default router;
