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



const UserService = {
  login: login,
};

export default UserService;