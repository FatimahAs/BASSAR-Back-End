"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.registerHelper = exports.registerUser = void 0;
const user_model_1 = require("../models/user.model");
const Service_model_1 = require("../models/Service.model");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, phone } = req.body;
    try {
        const user = yield user_model_1.User.create({ name, email, password, phone, role: 'user' });
        res.status(201).json(user);
    }
    catch (err) {
        res.status(500).json({ message: 'خطأ في التسجيل', error: err });
    }
});
exports.registerUser = registerUser;
const registerHelper = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, phone, serviceType, price } = req.body;
    try {
        const service = yield Service_model_1.Service.create({ type: serviceType, price });
        const helper = yield user_model_1.User.create({
            name,
            email,
            password,
            phone,
            role: 'helper',
            service: service._id,
        });
        res.status(201).json(helper);
    }
    catch (err) {
        res.status(500).json({ message: 'خطأ في التسجيل', error: err });
    }
});
exports.registerHelper = registerHelper;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const { name, email, password, phone } = req.body;
    try {
        const user = yield user_model_1.User.findByIdAndUpdate(userId, { name, email, password, phone }, { new: true });
        if (!user) {
            res.status(404).json({ message: 'المستخدم غير موجود' });
            return;
        }
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ message: 'خطأ في التعديل', error: err });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        const deletedUser = yield user_model_1.User.findByIdAndDelete(userId);
        if (!deletedUser) {
            res.status(404).json({ message: 'المستخدم غير موجود' });
            return;
        }
        res.json({ message: 'تم الحذف بنجاح' });
    }
    catch (err) {
        res.status(500).json({ message: 'خطأ في الحذف', error: err });
    }
});
exports.deleteUser = deleteUser;
