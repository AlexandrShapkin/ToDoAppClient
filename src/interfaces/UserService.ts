import AuthAccessData from "../types/AuthAccessData";
import ResponseError from "../types/ResponseError";
import UserAuthData from "../types/UserAuthData";

interface UserService {
  login(
    url: string,
    userDataDto: UserAuthData
  ): Promise<AuthAccessData | ResponseError>;
  register(
    url: string,
    userDataDto: UserAuthData
  ): Promise<AuthAccessData | ResponseError>;
  logout(url: string): Promise<string | ResponseError>;
  refresh(url: string): Promise<AuthAccessData | ResponseError>;
}

export default UserService;
