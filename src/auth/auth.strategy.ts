import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { ForbiddenException, Injectable } from '@nestjs/common';

import { AuthService } from './auth.service';
import { USER_ERROR_MESSAGE } from 'src/constants/user';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new ForbiddenException(
        USER_ERROR_MESSAGE.INVALID_EMAIL_OR_PASSWORD,
      );
    }

    return user;
  }
}
