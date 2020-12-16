import { createAdapter } from 'socket.io-redis'
import { RedisClient } from 'redis'
import { IoAdapter } from './io-adapter'

const pubClient = new RedisClient({ host: 'localhost', port: 6379 })
const subClient = pubClient.duplicate()

export class RedisIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: any): any {
    const server = super.createIOServer(port, options)

    server.adapter(createAdapter({ pubClient, subClient }))
    return server
  }
}
