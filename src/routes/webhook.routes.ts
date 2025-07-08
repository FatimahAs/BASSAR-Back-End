import express from 'express';
import { handleLemonWebhook } from '../controllers/webhook.controller';

const router = express.Router();

// نقطة استقبال إشعارات LemonSqueezy
router.post('/lemonsqueezy', express.json({ type: '*/*' }), handleLemonWebhook);

export default router;
