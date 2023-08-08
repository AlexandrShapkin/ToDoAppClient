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


const UserService = {
  login: login,
  register: register
};

export default UserService;