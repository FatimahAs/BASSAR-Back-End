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
exports.requestService = exports.getServices = void 0;
const Service_model_1 = require("../models/Service.model");
const getServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const services = yield Service_model_1.Service.find();
        res.status(200).json(services);
    }
    catch (error) {
        res.status(500).json({ message: 'خطأ في جلب الخدمات' });
    }
});
exports.getServices = getServices;
const requestService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { serviceId } = req.params;
    const userId = req.user._id;
    try {
        const service = yield Service_model_1.Service.findById(serviceId);
        if (!service) {
            res.status(404).json({ message: 'الخدمة غير موجودة' });
            return;
        }
    }
    catch (error) {
        console.error('Error requesting service:', error);
        res.status(500).json({ message: 'خطأ في طلب الخدمة' });
    }
});
exports.requestService = requestService;
