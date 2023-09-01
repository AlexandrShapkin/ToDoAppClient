import UserDataDto from "../dtos/UserDataDto";
import UserDto from "../dtos/UserDto";
import UserService from "../interfaces/UserService";

import { saveToken } from "../service/TokenService";
import { instanceOfResponseError } from "../types/ResponseError";

class UserController {
  private apiUrl: string;
  private userService: UserService;

  constructor(apiUrl: string, userService: UserService) {
    this.apiUrl = apiUrl;
    this.userService = userService;
  }

  public async login({
    username,
    password,
  }: UserDataDto): Promise<UserDto> {
    const response = await this.userService.login(this.apiUrl, { username, password });
    if (instanceOfResponseError(response)) {
      console.log(response);
      throw Error(response.message);
    }
    if (response.accessToken) {
      saveToken(response.accessToken);
    }
    return response.userDto;
  }
  
  public async register({
    username,
    password,
  }: UserDataDto): Promise<UserDto> {
    const response = await this.userService.register(this.apiUrl, { username, password });
    if (instanceOfResponseError(response)) {
      console.log(response);
      throw Error(response.message);
    }
    if (response.accessToken) {
      saveToken(response.accessToken);
    }
    return response.userDto;
  }
  
  public async logout() {
    const response = await this.userService.logout(this.apiUrl);
    if (typeof response != "string" && instanceOfResponseError(response)) {
      console.log(response);
      throw Error(response.message);
    }
    saveToken("");
  }
  
  public async refresh(setUser: (newUser: UserDto) => void) {
    const response = await this.userService.refresh(this.apiUrl);
    if (instanceOfResponseError(response)) {
      console.log(response);
      throw Error(response.message);
    }
    if (response.accessToken) {
      saveToken(response.accessToken);
      setUser(response.userDto);
    }
  }
}

export default UserController;
