import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './Entities/user.entity';

export const GetUser = createParamDecorator(
  (data: unknown, req: ExecutionContext): User => {
    const request = req.switchToHttp().getRequest();
    return request.user;
  },
);
