import UserDataDto from "../dtos/UserDataDto";
import UserDto from "../dtos/UserDto";
import UserService from "../service/UserService";

import { saveToken } from "../service/TokenService";
import { API_URL } from "../env/env";

const URL = API_URL;

export async function login({
  username,
  password,
}: UserDataDto): Promise<UserDto> {
  const response = await UserService.login(URL, { username, password });
  if (response.message) {
    console.log(response);
    throw Error(response.message);
  }
  if (response.accessToken) {
    saveToken(response.accessToken);
  }
  return response.userDto;
}

export async function register({
  username,
  password,
}: UserDataDto): Promise<UserDto> {
  const response = await UserService.register(URL, { username, password });
  if (response.message) {
    console.log(response);
    throw Error(response.message);
  }
  if (response.accessToken) {
    saveToken(response.accessToken);
  }
  return response.userDto;
}

export async function logout() {
  const response = await UserService.logout(URL);
  if (response.message) {
    console.log(response);
    throw Error(response.message);
  }
  saveToken("");
}

export async function refresh(setUser: (newUser: UserDto) => void) {
  const response = await UserService.refresh(URL);
  if (response.message) {
    console.log(response);
    throw Error(response.message);
  }
  if (response.accessToken) {
    saveToken(response.accessToken);
    setUser(response.userDto);
  }
}

const UserController = {
  login: login,
  register: register,
  logout: logout,
  refresh: refresh,
};

export default UserController;
