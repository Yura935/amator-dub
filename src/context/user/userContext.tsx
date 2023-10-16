import { createContext, useContext } from "react";

import { BaseProps } from "../../interfaces/baseProps";

const initValue = {
  currentUser: {},
  userData: {
    uid: "",
    fullName: "",
    email: "",
    registrationDate: "",
    avatar: "",
    city: "",
    docId: "",
    location: "",
    team: "",
    age: null,
    characteristics: {
      userHeight: null,
      userWeight: null,
      maxJumpHeight: null,
      maxFeedForce: null,
      playedGamesCount: null,
      serving: null,
      aces: null,
      blocks: null,
    },
  },
};

const AuthContext = createContext(initValue);

export function AuthProvider({ children, value }: BaseProps) {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthValue() {
  return useContext(AuthContext);
}
