
import express from 'express';
import {
  addDangerZone,
  updateDangerZone,
  deleteDangerZone,
  getAllDangerZones,
  getNearbyZones,
} from '../controllers/danger.controller';

import { protectRoute } from '../middleware/auth.middleware';

import { upload } from '../middleware/upload.middleware';

const router = express.Router();

//router.get('/danger-zones', getAllDangerZones);
router.get('/danger-zones/nearby', getNearbyZones);

router.post('/danger-zones', protectRoute, addDangerZone);
router.put('/danger-zones/:id', protectRoute, updateDangerZone);
router.delete('/danger-zones/:id', protectRoute, deleteDangerZone);

router.post(
  '/danger-zones',
  protectRoute,
  upload.single('image'),
  addDangerZone
);
export default router;




