"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const danger_controller_1 = require("../controllers/danger.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const upload_middleware_1 = require("../middleware/upload.middleware");
const router = express_1.default.Router();
router.get('/danger-zones', danger_controller_1.getAllDangerZones);
router.get('/danger-zones/nearby', danger_controller_1.getNearbyZones);
router.post('/danger-zones', auth_middleware_1.protectRoute, danger_controller_1.addDangerZone);
router.put('/danger-zones/:id', auth_middleware_1.protectRoute, danger_controller_1.updateDangerZone);
router.delete('/danger-zones/:id', auth_middleware_1.protectRoute, danger_controller_1.deleteDangerZone);
router.post('/danger-zones', auth_middleware_1.protectRoute, upload_middleware_1.upload.single('image'), danger_controller_1.addDangerZone);
exports.default = router;
