import { IsEmail, Length } from 'class-validator';

import { USER_ERROR_MESSAGE } from 'src/constants/user';
import { ValidateUserPassword } from 'src/helpers/decorators/validate-user-password';

export class CreateUserDto {
  @Length(2, 50)
  fullName: string;

  @IsEmail(
    {},
    {
      message: USER_ERROR_MESSAGE.INVALID_EMAIL,
    },
  )
  email: string;

  @ValidateUserPassword()
  password?: string;
}
