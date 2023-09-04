import TokenRepo from "../interfaces/TokenRepo";
import UserService from "../interfaces/UserService";

import { instanceOfResponseError } from "../types/ResponseError";
import UserAuthData from "../types/UserAuthData";
import UserData from "../types/UserData";

class UserController {
  private apiUrl: string;
  private userService: UserService;
  private tokenRepo: TokenRepo;

  constructor(apiUrl: string, userService: UserService, tokenRepo: TokenRepo) {
    this.apiUrl = apiUrl;
    this.userService = userService;
    this.tokenRepo = tokenRepo;
  }

  public async login({
    username,
    password,
  }: UserAuthData): Promise<UserData> {
    const response = await this.userService.login(this.apiUrl, { username, password });
    if (instanceOfResponseError(response)) {
      console.log(response);
      throw Error(response.message);
    }
    if (response.accessToken) {
      this.tokenRepo.save(response.accessToken);
    }

    return response.userDto;
  }
  
  public async register({
    username,
    password,
  }: UserAuthData): Promise<UserData> {
    const response = await this.userService.register(this.apiUrl, { username, password });
    if (instanceOfResponseError(response)) {
      console.log(response);
      throw Error(response.message);
    }
    if (response.accessToken) {
      this.tokenRepo.save(response.accessToken);
    }
    return response.userDto;
  }
  
  public async logout() {
    const response = await this.userService.logout(this.apiUrl);
    if (typeof response != "string" && instanceOfResponseError(response)) {
      console.log(response);
      throw Error(response.message);
    }
    this.tokenRepo.save("");
  }
  
  public async refresh(setUser: (newUser: UserData) => void) {
    const response = await this.userService.refresh(this.apiUrl);
    if (instanceOfResponseError(response)) {
      console.log(response);
      throw Error(response.message);
    }
    if (response.accessToken) {
      this.tokenRepo.save(response.accessToken);
      setUser(response.userDto);
    }
  }
}

export default UserController;
