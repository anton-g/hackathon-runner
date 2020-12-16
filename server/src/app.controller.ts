import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('toplists')
  async getToplists(): Promise<any> {
    return {
      zero: await this.appService.getAll(0),
      one: await this.appService.getAll(1),
      two: await this.appService.getAll(2),
      three: await this.appService.getAll(3),
      four: await this.appService.getAll(4),
      five: await this.appService.getAll(5),
    }
  }
}
