import { User } from "firebase/auth";

import { IUser } from "./user";

export interface IInitAuthContextValue {
  currentUser: User | null;
  userData: IUser;
  setUserData: (userData: any) => void;
}
