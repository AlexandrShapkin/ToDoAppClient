import UserDataDto from "../dtos/UserDataDto";
import AuthAccessData from "../dtos/AuthAccessDto";
import UserService from "../service/UserService";

const URL = "http://localhost:3000/api";

export async function login({username, password}: UserDataDto) {
  const accessData: AuthAccessData = await UserService.login(URL, {username, password});
  if (accessData.accessToken) {
    localStorage.setItem("accessToken", accessData.accessToken);
  }
}

const UserController = {
  login: login,
};

export default UserController;