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
exports.getAllDangerZones = exports.getNearbyZones = exports.deleteDangerZone = exports.updateDangerZone = exports.addDangerZone = void 0;
const DangerZone_model_1 = require("../models/DangerZone.model");
const addDangerZone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { name, type, latitude, longitude } = req.body;
    try {
        const imageUrl = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
        const zone = yield DangerZone_model_1.DangerZone.create({
            name,
            type,
            location: {
                type: 'Point',
                coordinates: [parseFloat(longitude), parseFloat(latitude)],
            },
            imageUrl,
            addedBy: req.user,
        });
        res.status(201).json(zone);
    }
    catch (err) {
        res.status(500).json({ message: 'خطأ في إضافة المنطقة', error: err });
    }
});
exports.addDangerZone = addDangerZone;
const updateDangerZone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const zoneId = req.params.id;
    const { name, type, latitude, longitude } = req.body;
    try {
        const updated = yield DangerZone_model_1.DangerZone.findByIdAndUpdate(zoneId, {
            name,
            type,
            location: {
                type: 'Point',
                coordinates: [longitude, latitude],
            },
        }, { new: true });
        if (!updated) {
            res.status(404).json({ message: 'المنطقة غير موجودة' });
            return;
        }
        res.json(updated);
    }
    catch (err) {
        res.status(500).json({ message: 'خطأ في التعديل', error: err });
    }
});
exports.updateDangerZone = updateDangerZone;
const deleteDangerZone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const zoneId = req.params.id;
    try {
        const deleted = yield DangerZone_model_1.DangerZone.findByIdAndDelete(zoneId);
        if (!deleted) {
            res.status(404).json({ message: 'المنطقة غير موجودة' });
            return;
        }
        res.json({ message: 'تم الحذف بنجاح' });
    }
    catch (err) {
        res.status(500).json({ message: 'خطأ في الحذف', error: err });
    }
});
exports.deleteDangerZone = deleteDangerZone;
const getNearbyZones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { latitude, longitude, radius = 5000 } = req.query;
    if (!latitude || !longitude) {
        res.status(400).json({ message: 'يرجى توفير الإحداثيات' });
        return;
    }
    try {
        const zones = yield DangerZone_model_1.DangerZone.find({
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [parseFloat(longitude), parseFloat(latitude)],
                    },
                    $maxDistance: parseFloat(radius),
                },
            },
        });
        res.json(zones);
    }
    catch (err) {
        res.status(500).json({ message: 'فشل في جلب المناطق القريبة', error: err });
    }
});
exports.getNearbyZones = getNearbyZones;
const getAllDangerZones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const zones = yield DangerZone_model_1.DangerZone.find().populate('addedBy', 'name email');
        res.json(zones);
    }
    catch (err) {
        res.status(500).json({ message: 'فشل في جلب المناطق', error: err });
    }
});
exports.getAllDangerZones = getAllDangerZones;
