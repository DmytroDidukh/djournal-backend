import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

import { USER_ERROR_MESSAGE } from 'src/constants/user';

@ValidatorConstraint({ async: false })
class ValidateUserPasswordConstraint implements ValidatorConstraintInterface {
  validate(password: string | undefined, args: ValidationArguments): boolean {
    if (!password) {
      return true;
    }

    const [min, max] = args.constraints;

    const _passLength = String(password).length;
    return _passLength >= min && _passLength <= max;
  }

  defaultMessage(args: ValidationArguments) {
    const [min, max] = args.constraints;

    return USER_ERROR_MESSAGE.INVALID_PASSWORD(min, max);
  }
}

export function ValidateUserPassword(
  min = 8,
  max = 16,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'validateUserPassword',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [min, max],
      options: validationOptions,
      validator: ValidateUserPasswordConstraint,
    });
  };
}
