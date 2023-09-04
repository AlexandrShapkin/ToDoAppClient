import UserData from "../types/UserData";

export default interface AuthAccessDto {
  accessToken: string;
  refreshToken: string;
  userData: UserData;
}