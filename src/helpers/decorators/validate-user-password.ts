import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: false })
class ValidateUserPasswordConstraint implements ValidatorConstraintInterface {
  validate(password: string | undefined, args: ValidationArguments): boolean {
    if (!password) {
      return true;
    }

    const [min, max] = args.constraints;

    const _passwordLength = String(password).length;
    return _passwordLength >= min && _passwordLength <= max;
  }

  defaultMessage(args: ValidationArguments) {
    const [min, max] = args.constraints;

    return `Password should be longer or equal ${min} and shorter or equal ${max} characters.`;
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
