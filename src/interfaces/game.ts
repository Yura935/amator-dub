import { GameStatus } from "../types/gameStatus";
import { INote } from "./note";
import { IPlayer } from "./player";

export interface IGame {
  name: string;
  status: GameStatus;
  playersCount: number | string;
  maxPlayersCount: number | string;
  players: IPlayer[];
  date: string;
  createdBy: string;
  createdDate: string;
  location: string;
  notes: INote;
  docId?: string;
}
