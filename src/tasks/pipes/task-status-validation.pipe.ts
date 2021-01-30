import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../tasks-status.enum';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly avaliableStatus = [
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
    const index = this.avaliableStatus.indexOf(status);
    return index !== -1;
  }
}
