import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

import { USER_ERROR_MESSAGE } from 'src/constants/user';

@Injectable()
export class UserExistGuard implements CanActivate {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const user = context.switchToHttp().getRequest().body;

    const doesUserExist = !!(await this.userRepository.findOne({
      where: { email: user.email },
    }));

    if (doesUserExist) {
      throw new ConflictException(USER_ERROR_MESSAGE.EXIST);
    }

    return !doesUserExist;
  }
}
