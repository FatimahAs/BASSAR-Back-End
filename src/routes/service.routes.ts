import express from 'express';
import {
  getServices,
  requestService,
} from '../controllers/service.controller';
import { protectRoute } from '../middleware/auth.middleware';

const router = express.Router();

// ✅ جلب جميع الخدمات
router.get('/', getServices);

// ✅ طلب خدمة معينة من مساعد
router.post('/request/:serviceId', protectRoute, requestService);

export default router;
