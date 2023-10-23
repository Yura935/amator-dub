import { configureStore } from "@reduxjs/toolkit";

import { gamesSlice, userSlice } from "./slices";

const { addCurrentUserUId, addUserData, removeCurrentUser, removeUserData } =
  userSlice.actions;
const { addNewGame } = gamesSlice.actions;
const store = configureStore({
  reducer: { user: userSlice.reducer, games: gamesSlice.reducer },
});

export {
  addCurrentUserUId,
  addUserData,
  removeCurrentUser,
  removeUserData,
  addNewGame,
};
export default store;
