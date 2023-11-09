import { ICommentAuthor } from "./commentAuthor";

export interface IComment {
  message: string;
  author: ICommentAuthor;
  creationDate: Date | string | null;
}
