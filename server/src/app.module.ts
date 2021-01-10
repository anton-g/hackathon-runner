import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import * as Joi from '@hapi/joi'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AppGateway } from './app.gateway'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Score } from './score.entity'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production')
          .default('development'),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USER: Joi.string().required(),
        DB_PASSWORD: Joi.string().allow(''),
        DB_NAME: Joi.string().required(),
        REDIS_HOST: Joi.string(),
        REDIS_PORT: Joi.number(),
        REDIS_PASSWORD: Joi.string(),
        REDIS_TLS: Joi.boolean(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get('DB_USER'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_NAME'),
          entities: [Score],
          synchronize: true,
          ssl:
            configService.get('NODE_ENV') === 'production'
              ? {
                  rejectUnauthorized: false,
                }
              : false,
        }
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Score]),
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
