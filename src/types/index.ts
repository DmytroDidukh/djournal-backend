export type UserErrorMessageType = {
  EXIST: string;
  INVALID_EMAIL: string;
  INVALID_EMAIL_OR_PASSWORD: string;
  INVALID_PASSWORD: (min: number, max: number) => string;
};
