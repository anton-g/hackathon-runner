import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { AppService } from './app.service'
import { Game } from './game'

@WebSocketGateway()
export class AppGateway implements OnGatewayDisconnect {
  @WebSocketServer()
  server: Server
  game: Game

  constructor(private readonly appService: AppService) {
    this.game = new Game()
  }

  @SubscribeMessage('message')
  async handleMessage(
    client: Socket,
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

  @SubscribeMessage('join')
  async handleJoin(client: Socket, payload: string): Promise<void> {
    this.game.addPlayer(client, payload)
  }

  @SubscribeMessage('input')
  async handleInput(
    client: Socket,
    payload: { x: number; y: number },
  ): Promise<void> {
    this.game.handleInput(client, payload)
  }

  handleDisconnect(client: Socket) {
    this.game.removePlayer(client)
  }
}
