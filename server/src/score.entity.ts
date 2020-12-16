import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Score {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column('float')
  time: number

  @Column()
  gems: number
}
