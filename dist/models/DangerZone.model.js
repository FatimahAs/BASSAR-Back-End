"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DangerZone = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dangerZoneSchema = new mongoose_1.default.Schema({
    name: String,
    type: {
        type: String,
        enum: ['حفرة', 'منطقة مقطوعة', 'منطقة محظورة', 'ممر جمال', 'طريق وعر '],
    },
    location: {
        type: { type: String, default: 'Point' },
        coordinates: [Number],
    },
    imageUrl: String,
    addedBy: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });
dangerZoneSchema.index({ location: '2dsphere' });
exports.DangerZone = mongoose_1.default.model('DangerZone', dangerZoneSchema);
