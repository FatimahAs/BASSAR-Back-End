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
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const logger_1 = __importDefault(require("./utils/logger"));
const helpers_1 = require("./utils/helpers");
const http_status_1 = require("./utils/http-status");
const database_1 = require("./config/database");
const errors_1 = require("./utils/errors");
const node_http_1 = require("node:http");
const socket_io_1 = require("socket.io");
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const service_routes_1 = __importDefault(require("./routes/service.routes"));
const danger_routes_1 = __importDefault(require("./routes/danger.routes"));
const notification_1 = require("./socket/notification");
dotenv_1.default.config();
const app = (0, express_1.default)();
const servers = (0, node_http_1.createServer)(app);
const io = new socket_io_1.Server(servers, {
    cors: {
        origin: ['http://localhost:3000', 'http://localhost:5173', 'https://weather-c3fd.onrender.com'],
        credentials: true,
    },
});
// Middleware
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173', 'https://weather-c3fd.onrender.com'];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('tiny', { stream: { write: (message) => logger_1.default.info(message.trim()) } }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.use('/api/users', user_routes_1.default);
app.use('/api/services', service_routes_1.default);
app.use('/api/danger-zones', danger_routes_1.default);
app.get('/', (req, res) => {
    res.status(http_status_1.OK).json({ message: 'Bassar API - Welcome!' });
});
// Socket.io
(0, notification_1.initSocket)(io);
// Error handler
app.use((err, req, res, next) => {
    logger_1.default.error('Error:', err.message);
    if (err instanceof errors_1.AppError) {
        res.status(err.statusCode).json(Object.assign({ status: err.status, message: err.message }, (helpers_1.dev && { stack: err.stack })));
        return;
    }
    res.status(http_status_1.INTERNAL_SERVER_ERROR).json(Object.assign({ status: 'error', message: 'Something went wrong!' }, (helpers_1.dev && { error: err.message, stack: err.stack })));
});
// Start server
const server = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_1.connect)();
    servers.listen(helpers_1.port, () => { logger_1.default.info(`✅ Server is running at http://localhost:${helpers_1.port}`); });
});
server();
