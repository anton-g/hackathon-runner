import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { RedisIoAdapter } from './redis-io-adapter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')
  app.useWebSocketAdapter(new RedisIoAdapter(app))
  await app.listen(process.env.PORT || 3001)
}

bootstrap()
