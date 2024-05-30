import {IHeroPower} from "./hero-power.interface";
import {IProfile} from "./profile.interface";

export interface IHero{
  id: string;
  profile: IProfile;
  profileId: string;
  totalRating: number;
  powers: IHeroPower[];
  usersRated: string[];
}
