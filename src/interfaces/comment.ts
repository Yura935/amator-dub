import { IUser } from "./user";

export interface IComment {
  message: string;
  author: IUser | string;
  date: Date | string | null;
}
