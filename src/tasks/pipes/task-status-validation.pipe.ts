import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../tasks.model';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly anything = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];
  transform(value: any) {
    const aux = value.toUpperCase();
    console.log(aux);

    if (!this.isValidStatus(aux))
      throw new BadRequestException(`${value} is not a valid status`);

    return aux;
  }

  isValidStatus(status: any) {
    const index = this.anything.indexOf(status);
    return index !== -1;
  }
}
