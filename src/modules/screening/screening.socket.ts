import { Server, Socket } from 'socket.io';

export const screeningSocket = (socket: Socket, io: Server) => {
  socket.on('joinScreening', (screeningId, userId) => {
    console.log(`User ${userId} joined screening ${screeningId}`);
    socket.join(screeningId);
  });

};
