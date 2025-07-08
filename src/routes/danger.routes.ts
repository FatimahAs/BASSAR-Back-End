import express from 'express';
import {
  reportDangerZone,
  getAllDangerZones,
} from '../controllers/danger.controller';
import { protectRoute } from '../middleware/auth.middleware';

const router = express.Router();

// ✅ إضافة منطقة خطر جديدة
router.post('/report', protectRoute, reportDangerZone);

// ✅ جلب كل المناطق
router.get('/', getAllDangerZones);

export default router;
