import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './Repositories/task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './Entities/tasks.entity';
import { TaskStatus } from './tasks-status.enum';
import { User } from 'src/auth/Entities/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto, user);
  }

  async getTaskById(id: number, user: User): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id, userId: user.id },
    });

    if (!task) throw new NotFoundException(`Task with ID ${id} Not Found`);

    return task;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return await this.taskRepository.createTask(createTaskDto, user);
  }

  async deleteTask(id: number, user: User): Promise<void> {
    const task = await this.getTaskById(id, user);

    if (!task) throw new NotFoundException(`Task with ID ${id} Not Found`);
    await this.taskRepository.remove(task);
    console.log('Success');
  }

  async updateTaskStatus(
    id: number,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;

    await task.save();
    return task;
  }
}
