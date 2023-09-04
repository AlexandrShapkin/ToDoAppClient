import UserController from "../controllers/UserController";
import UserData from "./UserData";

type UserContextValue = {
  username: string;
  setUsername(newUsername: string): void;
  userId: string;
  setUserId(newUserId: string): void;
  setUser(newUser: UserData): void;
  userController: UserController;
  refreshUser(): Promise<void>
}

export default UserContextValue;