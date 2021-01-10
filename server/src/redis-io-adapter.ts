import { createAdapter } from 'socket.io-redis'
import { RedisClient } from 'redis'
import { IoAdapter } from './io-adapter'
import { ConfigService } from '@nestjs/config'
import { INestApplication } from '@nestjs/common'

export class RedisIoAdapter extends IoAdapter {
  private pubClient: RedisClient
  private subClient: RedisClient

  constructor(app: INestApplication) {
    super(app)

    const configService: ConfigService = app.get(ConfigService)
    this.pubClient = new RedisClient({
      host: configService.get('REDIS_HOST'),
      port: configService.get<number>('REDIS_PORT'),
      auth_pass: configService.get('REDIS_PASSWORD'),
      ...(configService.get('REDIS_TLS') && {
        tls: {
          host: configService.get('REDIS_HOST'),
        },
      }),
    })
    this.subClient = this.pubClient.duplicate()
  }

  createIOServer(port: number, options?: any): any {
    const server = super.createIOServer(port, options)

    server.adapter(
      createAdapter({ pubClient: this.pubClient, subClient: this.subClient }),
    )
    return server
  }
}
