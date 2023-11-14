import { User } from "firebase/auth";
import { createSelector } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import {
  addCommentToGame,
  addCurrentGame,
  addCurrentUserUId,
  addNewGame,
  addUserData,
  addUsers,
  joinGame,
  removeCurrentUser,
  removeUserData,
  updateGame,
} from "../store/store";
import { IComment } from "../interfaces/comment";
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

  const addComment = (comment: IComment) => {
    dispatch(addCommentToGame(comment));
  };

  const addAllUsersToStore = (users: IUser[]) => {
    dispatch(addUsers(users));
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
    addComment,
    addAllUsersToStore,
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

export const getAllUsers = createSelector(
  (state: IRootState) => state.users,
  (users) => users.users
);
