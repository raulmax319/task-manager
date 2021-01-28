import { TaskStatus } from '../tasks.model';

export class PatchTaskDto {
  id: string;
  status: TaskStatus;
}
