import { Server, Socket } from 'socket.io';

export const initSocket = (io: Server) => {
  io.on('connection', (socket: Socket) => {
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
