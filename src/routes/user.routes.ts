import express from 'express';
import {
  registerUser,
  registerHelper,
  updateUser,
  deleteUser,
} from '../controllers/user.controller';
import { loginUser } from '../controllers/auth.controller';

const router = express.Router();

router.post('/register-user', registerUser);
router.post('/register-helper', registerHelper);
router.post('/login', loginUser);

//auth
router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);

export default router;
