import { configureStore } from "@reduxjs/toolkit";

import { gamesSlice, userSlice, usersSlice } from "./slices";

const { addCurrentUserUId, addUserData, removeCurrentUser, removeUserData } =
  userSlice.actions;
const { addNewGame, joinGame, addCurrentGame, updateGame, addCommentToGame } =
  gamesSlice.actions;
const { addUsers, updateUser, addFeedback, initFeedbacks, updateFeedback } = usersSlice.actions;
const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    games: gamesSlice.reducer,
    users: usersSlice.reducer
  },
  // Fix error: "A non-serializable value was detected in the state"
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export {
  addCurrentUserUId,
  addUserData,
  removeCurrentUser,
  removeUserData,
  addNewGame,
  joinGame,
  addCurrentGame,
  updateGame,
  addCommentToGame,
  addUsers,
  updateUser,
  addFeedback,
  initFeedbacks,
  updateFeedback
};
export default store;
