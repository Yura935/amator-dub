import { IUserCharacteristics } from "./userCharacteristics";

export interface IUser {
  fullName: string;
  id: string;
  email: string;
  registrationDate: string;
  avatar: string;
  characteristics: IUserCharacteristics
  age?: number;
  phone?: string;
  team?: string;
  location?: string;
}
