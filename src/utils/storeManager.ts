import { User } from "firebase/auth";
import { createSelector } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import {
  addCurrentGame,
  addCurrentUserUId,
  addNewGame,
  addUserData,
  joinGame,
  removeCurrentUser,
  removeUserData,
  updateGame,
} from "../store/store";
import { IGame } from "../interfaces/game";
import { IPlayer } from "../interfaces/player";
import { IRootState } from "../store/interfaces";
import { IUser } from "../interfaces/user";

export const useStore = () => {
  const dispatch = useDispatch();

  const addUserDataToStore = (user: IUser) => {
    dispatch(addUserData(user));
  };

  const removeUserDataFromStore = () => {
    dispatch(removeUserData());
  };

  const addCurrentUserToStore = (user: User | null) => {
    dispatch(addCurrentUserUId(user ? user.uid : null));
  };

  const removeCurrentUserFromStore = () => {
    dispatch(removeCurrentUser());
  };

  const addNewGameToStore = (games: IGame[]) => {
    dispatch(addNewGame(games));
  };

  const addPlayerToGame = (player: IPlayer) => {
    dispatch(joinGame(player));
  };

  const addCurrentGameToStore = (game: IGame) => {
    dispatch(addCurrentGame(game));
  };

  const updateGameById = (game: IGame) => {
    dispatch(updateGame(game));
  };

  return {
    addUserDataToStore,
    addCurrentUserToStore,
    removeUserDataFromStore,
    removeCurrentUserFromStore,
    addNewGameToStore,
    addPlayerToGame,
    addCurrentGameToStore,
    updateGameById,
  };
};

export const getUserDataFromStore = createSelector(
  (state: IRootState) => state.user,
  (user) => user.userData
);

export const getCurrentUserFromStore = createSelector(
  (state: IRootState) => state.user,
  (user) => user.currentUserUId
);

export const getActiveGamesFromStore = createSelector(
  (state: IRootState) => state.games.games,
  (games) => games.filter((game) => game.status === "active")
);

export const getIncomingGamesFromStore = createSelector(
  (state: IRootState) => state.games.games,
  (games) => games.filter((game) => game.status === "incoming")
);

export const getFinishedGamesFromStore = createSelector(
  (state: IRootState) => state.games.games,
  (games) => games.filter((game) => game.status === "finished")
);

export const getAllGamesFromStore = createSelector(
  (state: IRootState) => state.games,
  (games) => games.games
);

export const getCurrentGame = createSelector(
  (state: IRootState) => state.games,
  (games) => games.currentGame
);
