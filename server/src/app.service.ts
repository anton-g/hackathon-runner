import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Score } from './score.entity'

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Score)
    private scoreRepository: Repository<Score>,
  ) {}

  async getAll(gems: number): Promise<Score[]> {
    return await this.scoreRepository.find({
      order: {
        time: 'ASC',
      },
      where: {
        gems,
      },
      take: 3,
    })
  }

  async create(name: string, time: number, gems: number): Promise<Score> {
    return this.scoreRepository.save({ name, time, gems })
  }
}
