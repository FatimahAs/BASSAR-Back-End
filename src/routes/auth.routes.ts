import { Router } from "express";
import { signUp,signIn,signOut} from '../controllers/auth.controller'
import { authorized } from "../middleware/auth.middleware";


const router = Router()

router.post('/signup', signUp)
router.post('/signin', signIn)
router.post('/signout',authorized, signOut)

export default router; 

