import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ namespace: '/alert' })
export class AlertGateway {

  @WebSocketServer() wss: Server

  sendToAll(msg: string) {
    this.wss.emit('alertTOclient', { type: 'Alert', message: msg })
  }
}
