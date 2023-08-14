import UserDataDto from "../dtos/UserDataDto";
import Fetcher from "../utils/Fetcher";

export async function login(url: string, userDataDto: UserDataDto) {
  return await Fetcher(`${url}/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userDataDto),
  });
}

export async function register(url: string, userDataDto: UserDataDto) {
  return await Fetcher(`${url}/registration`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userDataDto),
  });
}

export async function logout(url: string) {
  return await Fetcher(`${url}/logout`, {
    method: "POST",
    credentials: "include",
  });
}

export async function refresh(url: string) {
  return await Fetcher(`${url}/refresh`, {
    method: "POST",
    credentials: "include"
  })
}


const UserService = {
  login: login,
  register: register,
  logout: logout,
  refresh: refresh
};

export default UserService;