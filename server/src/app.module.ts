import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AppGateway } from './app.gateway'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Score } from './score.entity'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '',
      database: 'testdb',
      entities: [Score],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Score]),
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
