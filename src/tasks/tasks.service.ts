import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v1 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { PatchTaskDto } from './dto/patch-task.dto';
@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    // eslint-disable-next-line prettier/prettier
    return this.tasks.find(task => task.id === id);
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  deleteTask(id: string): void {
    // eslint-disable-next-line prettier/prettier
    this.tasks.filter(task => task.id !== id);
  }

  updateTaskStatus(patchTaskDto: PatchTaskDto): Task {
    const { id, status } = patchTaskDto;

    // eslint-disable-next-line prettier/prettier
    const task = this.getTaskById(id);
    task.status = status;
    console.log(task);
    return task;
  }
}
