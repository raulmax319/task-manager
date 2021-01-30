import { TaskStatus } from '../tasks-status.enum';

export class PatchTaskDto {
  id: string;
  status: TaskStatus;
}
