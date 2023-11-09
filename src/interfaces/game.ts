import { GameLevel } from "../types/gameLevel";
import { GameStatus } from "../types/gameStatus";
import { IComment } from "./comment";
import { INote } from "./note";
import { IPlayer } from "./player";

export interface IGame {
  hallName: string;
  status: GameStatus;
  playersCount: number | string;
  maxPlayersCount: number | string;
  players: IPlayer[];
  startDate: string | null;
  endDate: string | null;
  createdBy: string;
  createdDate: string;
  location: string;
  price: string | number;
  notes: INote;
  level: GameLevel;
  docId?: string;
  comments: IComment[];
}
