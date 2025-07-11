"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const service_controller_1 = require("../controllers/service.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
router.get('/', service_controller_1.getServices);
router.post('/request/:serviceId', auth_middleware_1.protectRoute, service_controller_1.requestService);
exports.default = router;
