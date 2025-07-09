import express from 'express';
import {
  getServices,
  requestService,
} from '../controllers/service.controller';
import { protectRoute } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/', getServices);


router.post('/request/:serviceId', protectRoute, requestService);

export default router;
