import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { IRootState } from "./interfaces";

import { IGame } from "../interfaces/game";
import { IPlayer } from "../interfaces/player";
import { IUser } from "../interfaces/user";

const initialState: IRootState = {
  user: {
    currentUserUId: null,
    userData: {
      uid: "",
      fullName: "",
      email: "",
      city: "",
      age: 0,
      avatar: "",
      registrationDate: "",
      phone: "",
      team: "",
      location: "",
      docId: "",
      characteristics: {
        userHeight: 0,
        userWeight: 0,
        maxJumpHeight: 0,
        maxFeedForce: 0,
        playedGamesCount: 0,
        serving: 0,
        aces: 0,
        blocks: 0,
      },
    },
  },
  games: {
    games: [],
    currentGame: {
      hallName: "",
      createdBy: "",
      createdDate: "",
      endDate: "",
      level: null,
      location: "",
      maxPlayersCount: "",
      notes: {
        color: "",
        fontStyle: "",
        fontWeight: "",
        text: "",
        textDecoration: "",
      },
      players: [],
      playersCount: "",
      price: "",
      startDate: "",
      status: "active",
      docId: "",
    },
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState.user,
  reducers: {
    addCurrentUserUId: (state, action: PayloadAction<any | null>) => {
      state.currentUserUId = action.payload ? action.payload : null;
    },
    removeCurrentUser: (state) => {
      state.currentUserUId = initialState.user.currentUserUId;
    },
    addUserData: (state, action: PayloadAction<IUser>) => {
      (state.userData as IUser) = action.payload;
    },
    removeUserData: (state) => {
      state.userData = initialState.user.userData;
    },
  },
});

export const gamesSlice = createSlice({
  name: "games",
  initialState: initialState.games,
  reducers: {
    addNewGame: (state, action: PayloadAction<IGame[]>) => {
      (state.games as IGame[]) = action.payload;
    },
    joinGame: (state, action: PayloadAction<IPlayer>) => {
      const prevState = { ...state };
      const currentGame = prevState.games.find(
        (game) => game.docId === action.payload.gameId
      );
      if (currentGame) {
        currentGame.players?.push(action.payload);
        currentGame.playersCount = (
          Number(currentGame.playersCount) + 1
        ).toString();
        state.games = prevState.games;
      }
    },
    addCurrentGame: (state, action: PayloadAction<IGame>) => {
      state.currentGame = action.payload;
    },
  },
});
