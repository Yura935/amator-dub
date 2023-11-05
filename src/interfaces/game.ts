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
  startDate: string;
  endDate: string;
  createdBy: string;
  createdDate: string;
  location: string;
  price: string | number;
  notes: INote;
  level: GameLevel;
  docId?: string;
}
