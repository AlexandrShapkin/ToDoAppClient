import UserDataDto from "../dtos/UserDataDto";
import UserDto from "../dtos/UserDto";
import UserService from "../service/UserService";

import { saveToken } from "../service/TokenService";

const URL = "http://localhost:3000/api";

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

const UserController = {
  login: login,
  register: register,
};

export default UserController;
