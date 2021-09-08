import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() wss: Server;      // for emiting everyone 

  private logger: Logger = new Logger('AppGateway')

  afterInit(server: Server) {
    this.logger.log("Initialized Websocket Gateway...!")
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected ${client.id}`)   // client_id its a unique string differet from every socket is connected 
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected...! :: ${client.id}`)    // when client is connected the client unique ID will get generated 
  }

  // @SubscribeMessage('msgTOserver')                                     -->
  // handleMessage(client: Socket, text: string): WsResponse<string> {
  //   return { event: 'msgTOclient', data: text };   // TS return statement      //this ll only sent a msg to particular user instead of this 
  // }                                                                   --> 


  @SubscribeMessage('msgTOserver')                                        //--->
  handleMessage(client: Socket, text: string): void {
    this.wss.emit('msgTOclient', text)                                                                                //add this to sent a msg to everyone
  }                                                                       //---> 
}
