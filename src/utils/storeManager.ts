import { useDispatch, useSelector } from "react-redux";
import { User } from "firebase/auth";

import {
  addCurrentUserUId,
  addUserData,
  removeCurrentUser,
  removeUserData,
  addNewGame,
} from "../store/store";

import { IGame } from "../interfaces/game";
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

  const getUserDataFromStore = useSelector(
    (state: IRootState) => state.user.userData
  );

  const getCurrentUserFromStore = useSelector(
    (state: IRootState) => state.user.currentUserUId
  );

  const addNewGameToStore = (game: IGame[]) => {
    dispatch(addNewGame(game));
  };

  const getAvailableGamesFromStore = useSelector((state: IRootState) =>
    state.games.games.filter((game) => game.status === "active")
  );

  return {
    addUserDataToStore,
    addCurrentUserToStore,
    removeUserDataFromStore,
    removeCurrentUserFromStore,
    getUserDataFromStore,
    getCurrentUserFromStore,
    addNewGameToStore,
    getAvailableGamesFromStore,
  };
};
