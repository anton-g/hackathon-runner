import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('toplists')
  getToplists(): any {
    return {
      zero: [
        { name: 'Foo Foo Foo Foo Foo', time: 200000 },
        { name: 'Foo', time: 200003 },
        { name: 'Foo', time: 200500 },
      ],
      one: [
        { name: 'Foo', time: 200000 },
        { name: 'FooFooFooFooFooFooFooFooFooFoo', time: 200003 },
        { name: 'Foo', time: 200500 },
      ],
      two: [
        { name: 'Foo', time: 200000 },
        { name: 'Foo', time: 200003 },
        { name: 'Foo', time: 200500 },
      ],
      three: [
        { name: 'Foo', time: 200000 },
        { name: 'Foo', time: 200003 },
        { name: 'Foo', time: 200500 },
      ],
      four: [
        { name: 'Foo', time: 200000 },
        { name: 'Foo', time: 200003 },
        { name: 'Foo', time: 200500 },
      ],
      five: [
        { name: 'Foo', time: 200000 },
        { name: 'Foo', time: 200003 },
        { name: 'Foo', time: 200500 },
      ],
    }
  }
}
