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

  async getTaskById(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne(id);

    if (!task) throw new NotFoundException(`Task with ID ${id} Not Found`);

    return task;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return await this.taskRepository.createTask(createTaskDto, user);
  }

  async deleteTask(id: number): Promise<void> {
    const task = await this.getTaskById(id);

    await this.taskRepository.remove(task);
    console.log('Success');
  }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;

    await task.save();
    return task;
  }
}
