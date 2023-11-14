import { IGame } from "../interfaces/game";
import { IUser } from "../interfaces/user";

export interface IRootState {
  user: {
    currentUserUId: string | null;
    userData: IUser;
  };
  games: {
    games: IGame[];
    currentGame: IGame;
  };
  users: {
    users: IUser[];
  };
}
