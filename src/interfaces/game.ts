import { GameStatus } from "../types/gameStatus";
import { IPlayer } from "./player";

export interface IGame {
  name: string;
  status: GameStatus;
  playersCount: number;
  availablePlayersCount: number;
  players: IPlayer[];
  date: string;
  createdBy: string;
  createdDate: string;
  location: string;
  notes: string;
}
