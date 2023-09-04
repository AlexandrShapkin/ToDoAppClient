import UserService from "../interfaces/UserService";
import AuthAccessData from "../types/AuthAccessData";
import ResponseError from "../types/ResponseError";
import UserAuthData from "../types/UserAuthData";
import Fetcher from "../utils/Fetcher";

class FetchUserService implements UserService {
  public async login(
    url: string,
    userDataDto: UserAuthData
  ): Promise<ResponseError | AuthAccessData> {
    return Fetcher(`${url}/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDataDto),
    });
  }

  public async register(
    url: string,
    userDataDto: UserAuthData
  ): Promise<ResponseError | AuthAccessData> {
    return Fetcher(`${url}/registration`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDataDto),
    });
  }

  public async logout(url: string): Promise<string | ResponseError> {
    return Fetcher(`${url}/logout`, {
      method: "POST",
      credentials: "include",
    });
  }

  public async refresh(url: string): Promise<ResponseError | AuthAccessData> {
    return Fetcher(`${url}/refresh`, {
      method: "POST",
      credentials: "include",
    });
  }
}

export default new FetchUserService();
