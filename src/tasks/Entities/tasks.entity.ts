/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from 'src/auth/Entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskStatus } from '../tasks-status.enum';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  // eslint-disable-next-line prettier/prettier
  @ManyToOne(type => User, user => user.tasks, { eager: false })
  user: User;

  @Column()
  userId: number;
}
