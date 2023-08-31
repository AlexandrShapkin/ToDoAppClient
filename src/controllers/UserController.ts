import UserDataDto from "../dtos/UserDataDto";
import UserDto from "../dtos/UserDto";
import UserService from "../service/UserService";

import { saveToken } from "../service/TokenService";

class UserController {
  private apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  async login({
    username,
    password,
  }: UserDataDto): Promise<UserDto> {
    const response = await UserService.login(this.apiUrl, { username, password });
    if (response.message) {
      console.log(response);
      throw Error(response.message);
    }
    if (response.accessToken) {
      saveToken(response.accessToken);
    }
    return response.userDto;
  }
  
  async register({
    username,
    password,
  }: UserDataDto): Promise<UserDto> {
    const response = await UserService.register(this.apiUrl, { username, password });
    if (response.message) {
      console.log(response);
      throw Error(response.message);
    }
    if (response.accessToken) {
      saveToken(response.accessToken);
    }
    return response.userDto;
  }
  
  async logout() {
    const response = await UserService.logout(this.apiUrl);
    if (response.message) {
      console.log(response);
      throw Error(response.message);
    }
    saveToken("");
  }
  
  async refresh(setUser: (newUser: UserDto) => void) {
    const response = await UserService.refresh(this.apiUrl);
    if (response.message) {
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
