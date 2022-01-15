export type UserErrorMessageType = {
  EXIST: string;
  INVALID_EMAIL: string;
  INVALID_PASSWORD: (min: number, max: number) => string;
};
