import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Server } from 'socket.io'
import { AppService } from './app.service'

@WebSocketGateway()
export class AppGateway {
  @WebSocketServer()
  server: Server

  constructor(private readonly appService: AppService) {}

  @SubscribeMessage('message')
  async handleMessage(
    client: any,
    payload: { name: string; time: number; gems: number },
  ): Promise<void> {
    console.log(payload)
    const f = await this.appService.create(
      payload.name,
      payload.time,
      payload.gems,
    )
    console.log(f)
  }
}
