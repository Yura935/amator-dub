import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";

import { BaseProps } from "../../interfaces/baseProps";
import { auth } from "../../firebase";
import { IInitAuthContextValue } from "../../interfaces/initAuthContextValue";

const initValue = {
  currentUser: null,
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
    age: "",
    characteristics: {
      userHeight: "",
      userWeight: "",
      maxJumpHeight: "",
      maxFeedForce: "",
      playedGamesCount: "",
      serving: "",
      aces: "",
      blocks: "",
    },
  },
  setUserData: (userData: any) => {},
};

const AuthContext = createContext(initValue);

export const AuthContextProvider = (props: BaseProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<any | null>(null);
  const [userData, setUsersData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        setUser(user);
        console.log(user);
        localStorage.setItem("uid", JSON.stringify(user?.uid || null));
      },
      setError
    );
    return () => unsubscribe();
  });

  const setUserData = (userData: any) => {
    setUsersData(userData);
  };

  return (
    <AuthContext.Provider
      value={{ currentUser: user, error, setUserData, userData }}
      {...props}
    />
  );
};

export const useAuthValue = () => {
  const auth = useContext(AuthContext);
  return { ...auth, isAuthenticated: auth.currentUser !== null };
};
