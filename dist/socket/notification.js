"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSocket = void 0;
const initSocket = (io) => {
    io.on('connection', (socket) => {
        console.log('🔌 User connected:', socket.id);
        socket.on('send-alert', (data) => {
            console.log('📢 Alert received:', data);
            io.emit('receive-alert', data);
        });
        socket.on('disconnect', () => {
            console.log('❌ User disconnected:', socket.id);
        });
    });
};
exports.initSocket = initSocket;
