import {GenderEnum} from "../../auth/enums/gender.enum";

export interface IProfile {
  id: string;
  fullName: string;
  city: string;
  profileId: string;
  userId: string;
  age: number;
  gender: GenderEnum;
  address: string;
  email: string;
  phone: string;
  summary: string;
  avatar: string;
}
