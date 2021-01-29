import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v1 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { PatchTaskDto } from './dto/patch-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    // eslint-disable-next-line prettier/prettier
    const found = this.tasks.find(task => task.id === id);

    if (!found) throw new NotFoundException(`Task with the ID ${id} Not Found`);

    return found;
  }

  getTasksWithFilter(filter: GetTasksFilterDto): Task[] {
    const { status, search } = filter;
    let tasks = this.getAllTasks();

    if (status) {
      // eslint-disable-next-line prettier/prettier
      tasks = tasks.filter(task => task.status === status);
    }

    if (search) {
      // eslint-disable-next-line prettier/prettier
      tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search));
    }
    return tasks;
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
    const found = this.getTaskById(id);
    // eslint-disable-next-line prettier/prettier
    this.tasks.filter(task => task.id !== found.id);
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
