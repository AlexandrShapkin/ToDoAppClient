import UserData from "./UserData";

type AuthAccessData = {
  accessToken: string;
  refreshToken: string;
  userData: UserData;
};

export default AuthAccessData;
