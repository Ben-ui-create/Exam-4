import {Server} from 'socket.io';
import sessionMiddleware from "../config/session.js";

export default class Socket {
  static io = null;

  static init(server, sessionMiddleware) {
    this.io = new Server(server, {
      cors: {
        origin: '*',
        credentials: true,
      },
    });

    this.io.use((socket, next) => {
      sessionMiddleware(socket.request, {}, next);
    });

    this.io.on('connection', this.handleConnect.bind(this));
  }

  static handleConnect(client) {
    const session = client.request.session;

    if (!session || !session.user.id) {
      client.emit('error', 'Unauthorized');
      client.disconnect();
      return;
    }

    client.join(`user_${session.user.id}`);

    console.log(`User ${session.user.id} connected`);
  }

  static emit(room, message, type = 'new message') {
    if (!this.io) return;

    this.io.to(room).emit(type, message);
  }
}