import { IsEmail, Length, ValidationArguments } from 'class-validator';

// import { IsUserAlreadyExist } from '../../services/decorator/IsUserAlreadyExist';

export class CreateUserDto {
  @Length(2, 50)
  fullName: string;

  @IsEmail(
    {},
    {
      message: 'Email address is invalid.',
    },
  )
  email: string;

  @Length(8, 20, {
    message: (args: ValidationArguments) => {
      const [min, max] = args.constraints;
      const { value } = args;

      if (!value) return 'Password is required.';

      if (args.value.length < min) {
        return `Too short, minimum length is ${min} character`;
      } else {
        return `Too long, maximum length is ${max} characters`;
      }
    },
  })
  password?: string;
}
