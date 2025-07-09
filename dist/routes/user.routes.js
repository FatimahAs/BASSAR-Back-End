"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const auth_controller_1 = require("../controllers/auth.controller");
const router = express_1.default.Router();
router.post('/register-user', user_controller_1.registerUser);
router.post('/register-helper', user_controller_1.registerHelper);
router.post('/login', auth_controller_1.loginUser);
//auth
router.put('/update/:id', user_controller_1.updateUser);
router.delete('/delete/:id', user_controller_1.deleteUser);
exports.default = router;
