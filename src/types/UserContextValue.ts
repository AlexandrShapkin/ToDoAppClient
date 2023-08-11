import UserDto from "../dtos/UserDto";

type UserContextValue = {
  username: string;
  setUsername(newUsername: string): void;
  userId: string;
  setUserId(newUserId: string): void;
  setUser(newUser: UserDto): void;
}

export default UserContextValue;