import { UserErrorMessageType } from 'src/types';

export const USER_ERROR_MESSAGE: UserErrorMessageType = {
  EXIST: 'User already exist.',
  INVALID_EMAIL: 'Email address is invalid.',
  INVALID_EMAIL_OR_PASSWORD: 'Wrong email or password.',
  INVALID_PASSWORD: (min, max) =>
    /* eslint-disable-next-line */
    `Password should contain only Latin letters and numbers. Be longer or equal ${min} and shorter or equal ${max} characters.`,
};
