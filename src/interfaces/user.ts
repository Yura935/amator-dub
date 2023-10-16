import { IUserCharacteristics } from "./userCharacteristics";

export interface IUser {
  fullName: string;
  uid: string;
  email: string;
  registrationDate: string;
  avatar: string;
  characteristics: IUserCharacteristics
  age: number;
  city: string;
  docId?: string;
  phone?: string;
  team?: string;
  location?: string;
}
