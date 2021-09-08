import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({ namespace: '/chat' })
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() wss: Server

  private logger: Logger = new Logger('ChatGateway');

  afterInit(server: any) {
    this.logger.log("Chat-Gateway Initializated......!")
  }

  handleConnection(client: any, ...args: any[]) {
    this.logger.log(`Chat-Gateway connnected ---- ${client.id}`);
  }
  handleDisconnect(client: any) {
    this.logger.log(`Chat-Gateway disconnected ---- ${client.id}`);
  }

  @SubscribeMessage('chatTOserver')
  handleMessage(client: Socket, message: { sender: string, message: string }) {
    this.wss.emit('chatTOclient', message)
  }
}
