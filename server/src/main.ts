import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { IoAdapter } from './io-adapter'
import { RedisIoAdapter } from './redis-io-adapter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  if (process.env.NODE_ENV === 'development') app.setGlobalPrefix('api')

  const configService: ConfigService = app.get(ConfigService)
  if (configService.get('REDIS_HOST')) {
    app.useWebSocketAdapter(new RedisIoAdapter(app))
  } else {
    app.useWebSocketAdapter(new IoAdapter(app))
  }

  await app.listen(process.env.PORT || 3001)
}

bootstrap()
