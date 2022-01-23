import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ConflictException,
} from '@nestjs/common';

import { UserService } from './user.service';
import { USER_ERROR_MESSAGE } from 'src/constants/user';

@Injectable()
export class UserExistGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const user = context.switchToHttp().getRequest().body;

    const doesUserExist = !!(await this.userService.findOneByEmail(user.email));

    if (doesUserExist) {
      throw new ConflictException(USER_ERROR_MESSAGE.EXIST);
    }

    return true;
  }
}
