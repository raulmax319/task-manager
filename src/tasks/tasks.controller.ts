import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/Entities/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Task } from './Entities/tasks.entity';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskStatus } from './tasks-status.enum';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(
    @Query(ValidationPipe) filter: GetTasksFilterDto,
    @GetUser() user: User,
  ) {
    return this.tasksService.getTasks(filter, user);
  }

  @Get('/:id')
  getTaskById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Delete('/:id')
  async deleteTask(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    await this.tasksService.deleteTask(id, user);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, status, user);
  }
}
