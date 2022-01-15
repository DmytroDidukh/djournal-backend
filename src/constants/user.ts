import { UserErrorMessageType } from 'src/types';

export const USER_ERROR_MESSAGE: UserErrorMessageType = {
  EXIST: 'User already exist.',
  INVALID_EMAIL: 'Email address is invalid.',
  INVALID_PASSWORD: (min, max) =>
    `Password should be longer or equal ${min} and shorter or equal ${max} characters.`,
};
