import { GameLevel } from "../types/gameLevel";
import { GameStatus } from "../types/gameStatus";
import { INote } from "./note";
import { IPlayer } from "./player";

export interface IGame {
  hallName: string;
  status: GameStatus;
  playersCount: number | string;
  maxPlayersCount: number | string;
  players: IPlayer[];
  date: string;
  createdBy: string;
  createdDate: string;
  location: string;
  notes: INote;
  level: GameLevel;
  docId?: string;
}
