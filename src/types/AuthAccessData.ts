import UserData from "./UserData";

type AuthAccessData = {
  accessToken: string;
  refreshToken: string;
  userDto: UserData;
};

export default AuthAccessData;
