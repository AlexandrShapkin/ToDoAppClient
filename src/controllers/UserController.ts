import UserDataDto from "../dtos/UserDataDto";
import ApiError from "../dtos/ApiError";
import UserService from "../service/UserService";

import { saveToken } from "../service/TokenService";

const URL = "http://localhost:3000/api";

export async function login({username, password}: UserDataDto): Promise<null|ApiError> {
  const response = await UserService.login(URL, {username, password});
  if (response.message) {
    return response;
  }
  if (response.accessToken) {
    saveToken(response.accessToken);
  }
  return null;
}

export async function register({username, password}: UserDataDto): Promise<null|ApiError> {
  const response = await UserService.register(URL, {username, password});
  if (response.message) {
    return response;
  }

  if (response.accessToken) {
    saveToken(response.accessToken);
  }
  return null;
}

const UserController = {
  login: login,
  register: register
};

export default UserController;