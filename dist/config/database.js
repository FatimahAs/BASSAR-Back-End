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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = exports.MONGODB_URI = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.MONGODB_URI = process.env.MONGODB_URI;
const connect = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!exports.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in the environment variables');
        }
        yield mongoose_1.default.connect(exports.MONGODB_URI);
        console.log("connected to Database");
    }
    catch (e) {
        console.error('Database connection error:', e);
    }
});
exports.connect = connect;
