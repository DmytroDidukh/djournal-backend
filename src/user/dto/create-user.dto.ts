import { IsEmail, Length } from 'class-validator';

import { ValidateUserPassword } from '../user.validation';
import { USER_ERROR_MESSAGE } from 'src/constants/user';

export class CreateUserDto {
  @Length(2, 50)
  fullName: string;

  @IsEmail(
    { unique: true },
    {
      message: USER_ERROR_MESSAGE.INVALID_EMAIL,
    },
  )
  email: string;

  @ValidateUserPassword()
  password?: string;
}
