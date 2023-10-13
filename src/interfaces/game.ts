import { GameStatus } from "../types/gameStatus";
import { IPlayer } from "./player";

export interface IGame {
  status: GameStatus;
  playersCount: number;
  availablePlayersCount: number;
  players: IPlayer[];
  date: string;
}
