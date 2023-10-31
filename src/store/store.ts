import { configureStore } from "@reduxjs/toolkit";

import { gamesSlice, userSlice } from "./slices";

const { addCurrentUserUId, addUserData, removeCurrentUser, removeUserData } =
  userSlice.actions;
const { addNewGame, joinGame } = gamesSlice.actions;
const store = configureStore({
  reducer: { user: userSlice.reducer, games: gamesSlice.reducer },
});

export {
  addCurrentUserUId,
  addUserData,
  removeCurrentUser,
  removeUserData,
  addNewGame,
  joinGame,
};
export default store;
