import { IPlayer } from "./player";

export interface IFeedback {
  docId: string;
  estimate: string | null;
  message: string;
  gameId: string;
  author: IPlayer;
  receiver: IPlayer;
}
